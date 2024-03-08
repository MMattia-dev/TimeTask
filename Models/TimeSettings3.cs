using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class TimeSettings3
    {
        //https://antal.pl/wiedza/kodeks-pracy/dzial-vi-czas-pracy
        //Art. 130. § 1. - Obowiązujący pracownika wymiar czasu pracy w przyjętym okresie rozliczeniowym, ustalany zgodnie z art.129 § 1, oblicza się: 1) mnożąc 40 godzin przez liczbę tygodni przypadających w okresie rozliczeniowym, a następnie 2) dodając do otrzymanej liczby godzin iloczyn 8 godzin i liczby dni pozostałych do końca okresu rozliczeniowego, przypadających od poniedziałku do piątku.
        //Art. 130. § 2. - Każde święto występujące w okresie rozliczeniowym i przypadające w innym dniu niż niedziela obniża wymiar czasu pracy o 8 godzin.

        public int Id { get; set; }
        public int? WorkerId { get; set; } // id pracownika , jeżeli  'null' to znaczy 'wszyscy'
        
        public int? OkresRozliczeniowy { get; set; }  //do wyboru: tygodnie albo miesiace // okres rozliczeniowy nieprzekracząjacy 4 miesięcy (od 1 do 4 miesięcy). Może być przedłużony do max 12 miesięcy. W przypadku pracowników z niepełnosprawnością obowiązuje ich sztywna norma tygodniowa. W praktyce oznacza, że okres rozliczeniowy ich czasu pracy wynosi zawsze tydzień i w żadnym przypadku nie może być dłuższy
        public bool? jezeliTydzien {  get; set; }
        public bool? jezeliMiesiac {  get; set; }
       
        public int? CzasPracy { get; set; } // ile godzin ma dniowka. Czas pracy nie może przekraczać 8 godzin na dobę i przeciętnie 40 godzin w przeciętnie pięciodniowym tygodniu pracy w przyjętym okresie rozliczeniowym nieprzekraczającym 4 miesięcy, z zastrzeżeniem art. 135-138, 143 i 144.
        public int? MaksymalnaLiczbaNadgodzin { get; set; } // maksymalna liczba nadgodzin w roku (150 godzin)

        //public int? MaksymalnaLiczbaNadgodzinDzien { get; set; } // 
        public int? MaksymalnaLiczbaNadgodzinTydzien { get; set; } // 8h
        public int? NieprzerwanyOdpoczynek { get; set; } // Nieprzerwany odpoczynek między dniami roboczymi (11h)

        [DataType(DataType.Time)]
        public DateTime? PoraNocnaStart { get; set; } //Pora nocna obejmuje 8 godzin między godzinami 21:00 a 7:00.

        [DataType(DataType.Time)]
        public DateTime? PoraNocnaKoniec { get; set; } //Pora nocna obejmuje 8 godzin między godzinami 21:00 a 7:00.

        //dni wolne od pracy
        public bool? CzyPoniedzialekWolny { get; set; }
        public bool? CzyWtorekWolny { get; set; }
        public bool? CzySrodaWolny { get; set; }
        public bool? CzyCzwartekWolny { get; set; }
        public bool? CzyPiatekWolny { get; set; }
        public bool? CzySobotaWolny { get; set; }
        public bool? CzyNiedzielaWolny { get; set; }






        //O ile może zostać zwiększony roczny limit pracy w nadgodzinach? W związku z tym,
        //że pracownik może mieć w tygodniu 8 godzin
        //nadliczbowych, maksymalny limit godzin nadliczbowych jaki można wprowadzić w regulaminie pracy,
        //układzie zbiorowym lub umowie o pracę,
        //może wynosić maksymalnie 416 nadgodzin w ciągu roku.


    }
}
