using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class MainSettings2
    {
        public int Id { get; set; }

        [DataType(DataType.Time)]
        public DateTime PoraNocna_Poczatek { get; set; }

        [DataType(DataType.Time)]
        public DateTime PoraNocna_Koniec { get; set; }

        public bool WolnyPoniedzialek { get; set; }
        public bool WolnyWtorek { get; set; }
        public bool WolnaSroda { get; set; }
        public bool WolnyCzwartek { get; set; }
        public bool WolnyPiatek { get; set; }
        public bool WolnaSobota { get; set; }
        public bool WolnaNiedziela { get; set; }


    }
}
