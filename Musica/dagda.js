//Módulos que serão utilizados no decorrer do programa
var musicxml = require("musicxml-interfaces");
var fs = require("fs");
var JsZip = require('jszip');
var zip = new JsZip();

//array que irá guardar as frases
var frase = new Array();
var score = new Array()
var arq = 'cdz'

//Lendo o arquivo vindo do Audiveris
fs.readFile('./mxl/'+arq+'.mxl', function (err, data){
	if (err) {
		throw err;
	}else{
		//Descompactando
		zip.loadAsync(data).then(function(zip) {

    		//Lendo o arquivo xml
    		zip.file(arq+'.xml').async("string").then(function (data) {

    			//convertendo para JSON
    			document = musicxml.parseScore(data);

  				//Pegando o tempo da partitura
  				var tempo = document.measures[0].parts.P1[1].times[0].beats + "/" + document.measures[0].parts.P1[1].times[0].beatTypes;
  				console.log("tempo: "+ tempo);
  				console.log('\n');
  				

  				if(undefined !== document.measures[0].parts.P1[3].staff){
  					staffClaves(tempo)
  				}else{
  					idClaves(tempo)
  				}


  				

  			});
    	});
	}
});

function staffClaves(tempo){
	//criando o arquivo JSON
	var time = tempo
	if (typeof localStorage === "undefined" || localStorage === null) {
		var LocalStorage = require('node-localstorage').LocalStorage;
		localStorage = new LocalStorage('./www/src/songs');
	}

	claves = document.measures[0].parts.P1[1].clefs.length;

	var musica = {
		"title" : document.work.workNumber,
		"tempo" : document.measures[0].parts.P1[2].sound.tempo,
		"time_signature" : time,
		"score" : staffSheet(claves)
		
	}


	localStorage.setItem(arq+'.json', JSON.stringify(musica));
	console.log(localStorage.getItem(arq+'.json'));
}

function idClaves(tempo){
	//criando o arquivo JSON
	var time= tempo
	if (typeof localStorage === "undefined" || localStorage === null) {
		var LocalStorage = require('node-localstorage').LocalStorage;
		localStorage = new LocalStorage('./www/src/songs');
	}

	claves = document.partList.length

	var musica = {
		"title" : document.work.workNumber,
		"tempo" : '60', //document.measures[0].parts.P1[2].sound.tempo,
		"time_signature" : time,
		"score" : idSheet(claves)
	}


	localStorage.setItem(arq+'.json', JSON.stringify(musica));
	console.log(localStorage.getItem(arq+'.json'));
}

function idSheet(quant){
	var x = 1;
	while(x <= quant){
		var p = "P" + x
		for (var j =  0; j < document.measures.length; j++) {
			for (var i =  0; i < document.measures[j].parts[p].length; i++) {

				if (undefined !== document.measures[j].parts[p][i].rest){

					if (undefined !== document.measures[j].parts[p][i].noteType) {
						and = document.measures[j].parts[p][i].noteType.duration * 4;	
					}else{
						and = document.measures[j].parts[p][i].duration * 4;
					}

					var nota = "-."+and 

				}

				if (undefined !== document.measures[j].parts[p][i]['pitch']){
					and = document.measures[j].parts[p][i].noteType.duration * 4;

					if ( undefined !== document.measures[j].parts[p][i].chord){								
						var nota = montaAcorde(document.measures[j].parts[p][i].pitch.step, document.measures[j].parts.P1[i].pitch.octave, and)

					}else{
						var nota = document.measures[j].parts[p][i].pitch.step + document.measures[j].parts[p][i].pitch.octave +"."+and;
					}						

				}
				if (nota !== null) {
					frase.push(nota)	
				}

			}
		}
		score[x-1] = {

			"instrument" : "oscillator-square",
			"volume" : 0.5,
			"sheet" : frase
		}
		x++
		frase = []
	}

	return score
}


function staffSheet(quant){
	var x = 1;
	while(x <= quant){
		for (var j =  0; j < document.measures.length; j++) {
			for (var i =  0; i < document.measures[j].parts.P1.length; i++) {

				if (undefined !== document.measures[j].parts.P1[i].pitch){

					and = document.measures[j].parts.P1[i].noteType.duration * 4;

					if (x == document.measures[j].parts.P1[i].staff) {

						if (undefined !== document.measures[j].parts.P1[i].rest){
							var nota = "-."+and 
						}else								
						if ( undefined !== document.measures[j].parts.P1[i].chord) {
							var nota = montaAcorde(document.measures[j].parts.P1[i].pitch.step, document.measures[j].parts.P1[i].pitch.octave, and)
						}else{
							var nota = document.measures[j].parts.P1[i].pitch.step + document.measures[j].parts.P1[i].pitch.octave +"."+and;
						}

						frase.push(nota)							


					}
				}
			}
		}
		score[x-1] = {

			"instrument" : "oscillator-square",
			"volume" : 0.5,
			"sheet": frase
		}
		x ++
		frase = []
	}
	return score
}


function montaAcorde(nota,oitava,duracao){
	var acorde = nota + oitava +'.'+duracao
	var Acorde = [acorde]
	var ch = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b']
	var pos = ch.indexOf(nota)
	var z = 1

	while(z < 3){

		if (z == 2) {
			pos += 3
		}else{
			pos += 4
		}

		if(pos > 11){
			pos -= 12
		}

		acorde =  ch[pos] + oitava +'.'+duracao
		Acorde.push(acorde)
		z++

	}
	return(Acorde)
}








