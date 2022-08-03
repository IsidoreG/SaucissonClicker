//Paramètre
let timer_parametre = 20;
let current_skin = 1;
let button_current_skin;

//Déclaration des éléments
let btn_jouer;
let score_txt;
let btn;
let timer_txt;
let img_btn_saucisson;
let input_timer_choose;
let best_score_txt;

let btn_skin_1;
let btn_skin_2;
let btn_skin_3;
let btn_skin_4;
let btn_skin_5;
let btn_skin_6;

//Déclaration des variables
let score = 0;
let best_score = 0;
let timer = timer_parametre;
let timer_interval;
let change_parameters_possible = true;
let skin_img_liste = ["./skins/skin01.png","./skins/skin02.png","./skins/skin03.png","./skins/skin04.png","./skins/skin05.png","./skins/skin06.png"]

document.addEventListener("DOMContentLoaded", function(event) {
	//Code qui s'exécute après le chargement de la page
	
	//Récupération des éléments
	btn_jouer  = document.getElementById("jouer");
	score_txt = document.getElementById("score");
	timer_txt = document.getElementById("timer");
	btn = document.getElementById("bouton_saucisson");
	img_btn_saucisson = document.getElementById("img_btn_saucisson");
	
	btn_skin_1 = document.getElementById("btn_skin_1");
	btn_skin_2 = document.getElementById("btn_skin_2");
	btn_skin_3 = document.getElementById("btn_skin_3");
	btn_skin_4 = document.getElementById("btn_skin_4");
	btn_skin_5 = document.getElementById("btn_skin_5");
	btn_skin_6 = document.getElementById("btn_skin_6");

	input_timer_choose = document.getElementById("time_choose");
	best_score_txt = document.getElementById("best_score");
	
	enable_button(false);
	timer_txt.innerHTML = String(timer_parametre);
	score_txt.innerHTML = String(score);
	skin_selected_apparence(btn_skin_1,true);
	button_current_skin = btn_skin_1;

	//Le prompt personnalisé
	document.getElementById('btn_skin_6').addEventListener('click', function() {
		customBox.innerHTML = '<p>Un mot de passe est requis</p>';
		customBox.innerHTML += '<input type="password" id="modal-prompt" /><br/>'
		customBox.innerHTML += '<button id="modal-submit">Valider</button>';
		customBox.innerHTML += '<button id="modal-close">Annuler</button>';
		modalShow();
	});

});

//Fonctions pour le script
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function enable_button(boo){
	/*
	Rend le bouton cliquable et visible ou non (suivant le paramètre)
	True : utilisable
	False : innutilisable
	*/
	
	if (boo == true){
		btn.disabled = false;
		btn.style.visibility = "visible";
	}
	else{
		btn.disabled = true;
		btn.style.visibility = "hidden";
	}
}

function skin_selected_apparence(skin, boo){
	if(boo){
		skin.style.borderColor = "black";
		skin.style.borderWidth = "5px";
		skin.style.padding = "3px 3px";
	}
	else{
		skin.style.borderColor = "#5c5c5c";
		skin.style.borderWidth = "3px";
		skin.style.padding = "5px 5px";
	}
}

function bouger_bouton(){
	/*
	Fais bouger le bouton à un endroit aléatoirement
	*/
	let marginTop = getRandomArbitrary(5,85);
	let marginLeft = getRandomArbitrary(5,85);
	
	
	btn.style.marginTop = String(marginTop).concat("%");
	btn.style.marginLeft = String(marginLeft).concat("%");
}


function start_timer(){
	/*
	Lance le timer
	*/
	timer_interval = setInterval(timer_on,1000);
	change_parameters_possible = false;
	
}

function timer_on(){
	/*
	Est utilisé pour la fonction start_timer (dans le setInterval)
	*/
	if (timer <= 0){
		clearInterval(timer_interval);
		change_parameters_possible = true;
		enable_button(false);
		timer_txt.innerHTML = String(timer_parametre);

		console.log(best_score,(score/timer_parametre)*10)
		if(best_score < (score/timer_parametre)*10){
			best_score = (score/timer_parametre)*10;
			best_score_txt.innerHTML = String(Math.round(best_score*100)/100).concat("  /10s")
		}
	}
	else{
		timer --;
		timer_txt.innerHTML = String(timer);
	}
}

function secret_skin(mdp){
	if(mdp == "1597532846"){
		skin_selected_apparence(button_current_skin,false);
		current_skin = 6;
		button_current_skin = btn_skin_6;
		skin_selected_apparence(button_current_skin,true);
		img_btn_saucisson.src = skin_img_liste[5];
	}
}



//OnClick bouton id="jouer"
function start_game(){
	score = 0;
	timer = timer_parametre;
	
	timer_txt.innerHTML = String(timer);
	score_txt.innerHTML = String(score);
	
	
	bouger_bouton();
	enable_button(true);
	start_timer();	
}

//OnClick bouton id="bouton_saucisson"
function saucisson_clique(){
	
	score += 1;
	score_txt.innerHTML = String(score);
	
	bouger_bouton()
	
}

//OnClick bouton id="btn_skin_?"
function skin_selected_onclick(nb){
	if(!(change_parameters_possible)){
		return
	}

	skin_selected_apparence(button_current_skin,false);
	

	switch(nb){
		case 1:
			current_skin = 1;
			button_current_skin = btn_skin_1;
			break;
		case 2:
			current_skin = 2;
			button_current_skin = btn_skin_2;
			break;
		case 3:
			current_skin = 3;
			button_current_skin = btn_skin_3;
			break;
		case 4:
			current_skin = 4;
			button_current_skin = btn_skin_4;
			break;
		case 5:
			current_skin = 5;
			button_current_skin = btn_skin_5;
			break;
	}


	skin_selected_apparence(button_current_skin,true);
	img_btn_saucisson.src = skin_img_liste[nb-1];

	
}

//OnClick button id="btn_valider"
function change_time_setting(){
	if(change_parameters_possible){
		if(!isNaN(input_timer_choose.value)){
			if(parseFloat(input_timer_choose.value) > 0 && Number.isInteger(parseFloat(input_timer_choose.value))){
				timer_parametre = parseFloat(input_timer_choose.value);
				timer_txt.innerHTML = String(timer_parametre);
			}
		}
	}

}

//Pour le prompt personalisé
let modalContainer = document.createElement('div');
modalContainer.setAttribute('id', 'modal');

let customBox = document.createElement('div');
customBox.className = 'custom-box';


function modalClose() {
    while (modalContainer.hasChildNodes()) {
        modalContainer.removeChild(modalContainer.firstChild);
    }
    document.body.removeChild(modalContainer);
}

function modalShow() {
    modalContainer.appendChild(customBox);
    document.body.appendChild(modalContainer);

    document.getElementById('modal-close').addEventListener('click', function() {
        modalClose();
    });

    if (document.getElementById('modal-submit')) {
        document.getElementById('modal-submit').addEventListener('click', function () {
            secret_skin(document.getElementById('modal-prompt').value);
            modalClose();
        });
    }
}