namespace TimeTask.Models
{
    public class TimeSettings2
    {
        //https://antal.pl/wiedza/kodeks-pracy/dzial-vi-czas-pracy
        //Art. 130. § 1. - Obowiązujący pracownika wymiar czasu pracy w przyjętym okresie rozliczeniowym, ustalany zgodnie z art.129 § 1, oblicza się: 1) mnożąc 40 godzin przez liczbę tygodni przypadających w okresie rozliczeniowym, a następnie 2) dodając do otrzymanej liczby godzin iloczyn 8 godzin i liczby dni pozostałych do końca okresu rozliczeniowego, przypadających od poniedziałku do piątku.
        //Art. 130. § 2. - Każde święto występujące w okresie rozliczeniowym i przypadające w innym dniu niż niedziela obniża wymiar czasu pracy o 8 godzin.

        public int Id { get; set; }
        public int? WorkerId { get; set; } // id pracownika , jeżeli  'null' to znaczy 'wszyscy'
        public int? OkresRozliczeniowy { get; set; } // okres rozliczeniowy nieprzekracząjacy 4 miesięcy (od 1 do 4 miesięcy). Może być przedłużony do max 12 miesięcy.
        public int? CzasPracy { get; set; } // ile godzin ma dniowka. Czas pracy nie może przekraczać 8 godzin na dobę i przeciętnie 40 godzin w przeciętnie pięciodniowym tygodniu pracy w przyjętym okresie rozliczeniowym nieprzekraczającym 4 miesięcy, z zastrzeżeniem art. 135-138, 143 i 144.
        public int? MaksymalnaLiczbaNadgodzin { get; set; } // maksymalna liczba nadgodzin w roku (150 godzin)


        //Pora nocna obejmuje 8 godzin między godzinami 21:00 a 7:00.

        //public int? MaksymalnaLiczbaNadgodzinDzien { get; set; } // 
        public int? MaksymalnaLiczbaNadgodzinTydzien { get; set; } // 8h
        public int? NieprzerwanyOdpoczynek { get; set; } // Nieprzerwany odpoczynek między dniami roboczymi (11h)


        //O ile może zostać zwiększony roczny limit pracy w nadgodzinach? W związku z tym,
        //że pracownik może mieć w tygodniu 8 godzin
        //nadliczbowych, maksymalny limit godzin nadliczbowych jaki można wprowadzić w regulaminie pracy,
        //układzie zbiorowym lub umowie o pracę,
        //może wynosić maksymalnie 416 nadgodzin w ciągu roku.
    }
}
