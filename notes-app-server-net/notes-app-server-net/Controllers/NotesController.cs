using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using notes_app_server_net.Attributes;
using notes_app_server_net.DbContext;
using notes_app_server_net.Models;

namespace notes_app_server_net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [GetUserIdFilter]
    public class NotesController : ControllerBase
    {
        private readonly NoteContext _context;

        public NotesController(NoteContext context)
        {
            _context = context;
        }

        // GET: api/Notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
        {
            string? userIdOrSub = HttpContext.Items["userIdOrSub"] as string;
            // Filter the notes based on userIdOrSub
            if (userIdOrSub is not null)
            {
                return await _context.Notes.Where(n => n.UserId == userIdOrSub).OrderByDescending(n => n.Id).ToListAsync();
            }
            else
            {
                // Handle the case where userIdOrSub is null
                return NotFound();
            }
        }

        // GET: api/Notes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNote(int id)
        {
            string? userIdOrSub = HttpContext.Items["userIdOrSub"] as string;

            // Filter and retrieve the note
            var note = await _context.Notes
                                    .Where(n => n.Id == id && n.UserId == userIdOrSub)
                                    .FirstOrDefaultAsync();

            // Handle cases where the note is not found or userIdOrSub is null
            if (note == null)
            {
                if (userIdOrSub is null)
                {
                    // Handle the case where userIdOrSub is missing
                    return BadRequest("Missing user information");
                }
                else
                {
                    // Note not found for the given user
                    return NotFound();
                }
            }

            return note;
        }

        // PUT: api/Notes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<Note>> PutNote(int id, Note note)
        {
            if (id != note.Id)
            {
                return BadRequest();
            }

            // Retrieve userIdOrSub from HttpContext
            string? userIdOrSub = HttpContext.Items["userIdOrSub"] as string;

            // Compare userIds and handle mismatches
            if (userIdOrSub != note.UserId)
            {
                return BadRequest("UserId mismatch");
            }

            // Attach or update the note in the context
            if (_context.Entry(note).State == EntityState.Detached)
            {
                _context.Attach(note);
            }
            _context.Entry(note).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return note;
        }

        // POST: api/Notes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote(Note note)
        {
            // Retrieve userIdOrSub from HttpContext
            string? userIdOrSub = HttpContext.Items["userIdOrSub"] as string;

            // Compare userIds and handle mismatches
            if (userIdOrSub != note.UserId)
            {
                return BadRequest("UserId mismatch");
            }

            // Add the note to the context and save changes
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNote", new { id = note.Id }, note);
        }

        // DELETE: api/Notes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            // Retrieve userIdOrSub from HttpContext
            string? userIdOrSub = HttpContext.Items["userIdOrSub"] as string;

            // Retrieve the note
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            // Compare userIds and handle mismatches
            if (userIdOrSub != note.UserId)
            {
                return BadRequest("UserId mismatch");
            }

            // Delete the note
            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NoteExists(int id)
        {
            return _context.Notes.Any(e => e.Id == id);
        }
    }
}
