using System;
using System.Collections.Generic;

namespace notes_app_server_net.Models;

public partial class Note
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public string UserId { get; set; } = null!;
}
