using Microsoft.AspNetCore.Mvc;

namespace TimeTask.Models
{
    public class Workers
    {
        public int Id { get; set; }
        public string Name { get; set; }   
        public int DepartmentID { get; set; }
        [HiddenInput]
        public bool Employed { get; set;}
    }
}
