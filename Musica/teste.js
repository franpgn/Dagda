//Módulos que serão utilizados no decorrer do programa
var musicxml = require("musicxml-interfaces");
var fs = require("fs");
var JsZip = require('jszip');
var zip = new JsZip();

//array que irá guardar as frases
var frase = new Array()
var arq = "vida"
//Lendo o arquivo vindo do Audiveris
fs.readFile('./mxl/'+arq+'.mxl', function (err, data){
	if (err) {
		throw err;
	}else{
		//Descompactando
		zip.loadAsync(data).then(function(zip) {

    		//Lendo o arquivo xml
    		zip.file(arq+'.xml').async("string").then(function (data) {

                var x = 'P' + 2

    			//convertendo para JSON
    			document = musicxml.parseScore(data);
    			//console.log(document.measures[0].parts.P1[3]);
    			//console.log(document.work.workNumber)//pega o nome do arquivo
    			//console.log(document.measures[0].parts.P1[2].sound.tempo)//pega o tempo
    			//console.log(document.partList[1].midiInstruments.id)
                // console.log(document.measures[8].parts.P1[0].noteType.duration)
                //console.log(document.partList.length)
                //console.log(document.measures[0].parts.P1[1].clefs.length)
                //console.log(document.measures[3].parts.P1[3].staff)
                //console.log(document.measures[1].parts[x][1]['pitch']['step'])
                //console.log(document.measures[0].parts.P1[3])
                //console.log(document.measures[0].parts[x])
                console.log(document.measures[0].parts.P1[4])

  			});
    	});
	}
});


// var acorde = 'b'
// var Acorde = [acorde]
// var ch = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b']
// var pos = ch.indexOf(acorde)
// console.log(pos)
// var x = 1

// while(x < 3){

//   if (x == 2) {
//     pos += 3
//   }else{
//     pos += 4
//   }

//   if(pos > 11){
//     pos -= 12
//   }

//   acorde =  ch[pos] 
//   Acorde.push(acorde)
//   x++

// }
// console.log(Acorde)


// for (var i = 0; i < frase.length; i++) {
//     if (frase[i] != " ") {
//         var letra = alfabeto.indexOf(frase[i]) + 3;
//         console.log(letra);
//         if (letra < 0 ) {
//                 letra = 26 - letra 
//         }
//         cod.push(alfabeto[letra])
//         letra = 0;
//     }
// }

//console.log(cod)























// var localStorage = require('node-localstorage')
// var bla = 2
// var ble = 3


// var teste = {
//     'valorUm': bla,
//     'valorDois': ble
// }

// localStorage.setItem('teste', JSON.stringify(teste));

// if (typeof localStorage === "undefined" || localStorage === null) {
//   var LocalStorage = require('node-localstorage').LocalStorage;
//   localStorage = new LocalStorage('./scratch');
// }


// var bla = "viva"
// var ble = "la vida"
// var teste = {
// 	"musica" : bla, 
// 	"compositor" : ble
// }



// localStorage.setItem('teste.json', JSON.stringify(teste));
// console.log(localStorage.getItem('teste.json'));