var areaID;

        var tArea = new XMLHttpRequest();
        tArea.open("GET","http://www.finnkino.fi/xml/TheatreAreas/",true); // hakee teattereiden tiedot
        tArea.send();

        tArea.onreadystatechange=function() { // checkup
        if (tArea.readyState==4 && tArea.status==200){
        var xmlDoc = tArea.responseXML; 
	
        var areaID = xmlDoc.getElementsByTagName("ID"); 
		var Select = document.getElementById("area");
        var tName = xmlDoc.getElementsByTagName("Name");
		
	for (let i = 0; i < tName.length; i++){ // looppi
		var Option = document.createElement("option");
		Option.value = areaID[i].firstChild.data;
		var Text = document.createTextNode(tName[i].firstChild.data);
		Select.appendChild(Option);
		Option.appendChild(Text);
	}
	
  }
}

function AddToTable(){ // main funktio

		areaValue = document.getElementById("area").value;
		
        var Schedule = new XMLHttpRequest();
        Schedule.open("GET","http://www.finnkino.fi/xml/Schedule/?area=" + areaValue ,true); // hakee aikataulun valinnan perusteella
        Schedule.send();

        Schedule.onreadystatechange=function() { // checkup
        if(Schedule.readyState==4 && Schedule.status==200){
        xmlDoc = Schedule.responseXML;
				
                var Show = xmlDoc.getElementsByTagName("Show"); //hakee XML pohjasta Show tagin tiedot
				
                create=""; // luo table
                    for (i = 0; i < Show.length; i++) { // looppi
					
                        var aika = Show[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue; // alku
						var teatteri = Show[i].getElementsByTagName("Theatre")[0].childNodes[0].nodeValue; // teatteri
						var kesto = Show[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue; //pituus
					    var sali = Show[i].getElementsByTagName("TheatreAuditorium")[0].childNodes[0].nodeValue; //hakee salin
						var kuva = Show[i].getElementsByTagName("EventMediumImagePortrait")[0].childNodes[0].nodeValue; // hakee kuvan
					
                        create += "<div class='fade' id='fade' style=display:none;>";
                        create += "<div class='pohja'>";
                        create += "<img src='" + kuva + "'/>";
                        create += "</br>";
                        create += "<div class='text'>";
                        create += teatteri;
                        create += "</br>";
						create += sali;
                        create += "</br>";
                        create += "Alkaa klo "+aika.slice(-8, -3); // slice muuttaa ajan oikean muotoiseksi
                        create += "</br>";
                        create += "Kesto "+kesto+" minuuttia";
                        create += "</br>";
                        create += "</div>";
                        create += "</div>";
                        create += "</div>";
                    }         
                   document.getElementById("tabledata").innerHTML = create; // luo tablen create
                   $(fade).fadeIn(500); //muotoilua
                    
            }
        }   
}