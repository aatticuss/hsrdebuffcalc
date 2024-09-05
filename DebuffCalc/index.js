document.addEventListener('DOMContentLoaded', function () {
    // Garantir que o primeiro formulário esteja visível e o segundo oculto ao carregar a página
    const form1 = document.getElementById('form-real-chance-calc');
    const form2 = document.getElementById('form-ehr-calc');
    form1.style.display = 'block';  // Mostrar o primeiro formulário
    form2.style.display = 'none';   // Esconder o segundo formulário
    createButton();
});

// Definindo as funções de cálculo
// Falta descubrir a formula disso aqui kkkkkkkkkkkkkkkkkkkkkkkk
// function CalculateEhrNeeded(){
//     const base_chance = parseFloat(document.getElementById('input-base-chance-f2').value);
//     const desired_chance = parseFloat(document.getElementById('input-desired-chance').value);
//     const enemy_effres = parseFloat(document.getElementById('input-effres-f2').value);
//     const enemey_debuffres = parseFloat(document.getElementById('input-debuffres-f2').value);
//     let calc_result = ((base_chance/100)) * (1)

function calculateRealchance(realchance_value){
    const base_chance = parseFloat(document.getElementById('input-base-chance-f1').value);
    const effhr = parseFloat(document.getElementById('input-ehr').value);
    const enemy_effres = parseFloat(document.getElementById('input-effres-f1').value);
    const enemey_debuffres = parseFloat(document.getElementById('input-debuffres-f1').value);
    let calc_result = ((base_chance/100) * ( 1 + (effhr/100)) * (1 - (enemy_effres/100)) * (1 - (enemey_debuffres/100))) * 100;
    
    if (calc_result > 100){
        calc_result = 100;
        document.getElementById(realchance_value).textContent = calc_result + '%';
    } else {
        document.getElementById(realchance_value).textContent = calc_result.toFixed(1);
    }
}

// Função para atualizar valor de acordo com slider
function updateValue(slider, display_value){
    display_value.textContent = slider.value + '%';
}

// Função para resetar o valor 
function resetValues(result_value){
    let sliders = document.querySelectorAll('.user-input-field');
    let slider_display = document.querySelectorAll('.display-value');

    document.getElementById(result_value).textContent = '0%';
    sliders.forEach(function(slider, i){
        slider.value = slider.getAttribute('data-initial');
        updateValue(slider, slider_display[i]);
    })
}

// Função que altera qual formulário está em display
function swapForm(show_form, hide_form){
    const form1 = document.getElementById(show_form);
    const form2 = document.getElementById(hide_form);
    form1.style.display = 'block';
    form2.style.display = 'none';
}   

// Função que cria dois botões de aumentar e diminuir em 1
function createButton(){
    const sliders = document.querySelectorAll('.user-input-field');
    const displays = document.querySelectorAll('.display-value');

    sliders.forEach(function(slider, i){
        const display = displays[i];

        const increase_btn = document.createElement('button');
        increase_btn.type = 'button';
        increase_btn.id = 'inc-btn';
        increase_btn.textContent = '+';
        increase_btn.className = 'assist-btn';
        increase_btn.addEventListener('click', function(){
            let add_value = Number(slider.value) + 1;
            if (add_value > Number(slider.max)){
                add_value = Number(slider.max);
            }
            slider.value = add_value;
            console.log('Aumentado ', add_value);
            updateValue(slider, display);
        });
        slider.parentElement.appendChild(increase_btn);
        
        const decrease_btn = document.createElement('button');
        decrease_btn.type = 'button';
        decrease_btn.id = 'dec-btn';
        decrease_btn.textContent = '-';
        decrease_btn.className = 'assist-btn';
        decrease_btn.addEventListener('click', function(){
            let sub_value = Number(slider.value) - 1;
            if (sub_value < Number(slider.min)){
                sub_value = Number(slider.min);
            }
            slider.value = sub_value;
            console.log('Diminuido ', sub_value);
            updateValue(slider, display);
        });
        slider.parentElement.appendChild(decrease_btn);
    });
}

//Chamando as funções - pagina de calculo de debuff
document.getElementById('calculate-realchance-btn').addEventListener('click', function() {
    calculateRealchance('result-calc-realchance', );
});

document.getElementById('btn-form-realchance').addEventListener('click', function(){
    swapForm('form-real-chance-calc', 'form-ehr-calc');
}); 

document.getElementById('btn-form-ehr').addEventListener('click', function(){
    swapForm('form-ehr-calc', 'form-real-chance-calc');
}); 

document.getElementById('btn-reset-f1').addEventListener('click', function(){
    resetValues('result-calc-realchance');
    
});

document.getElementById('input-base-chance-f1').addEventListener('input', function(){
    updateValue('input-base-chance-f1', 'basechance-value-f1')
})


let sliders = document.querySelectorAll('.user-input-field');
let slider_value = document.querySelectorAll('.display-value');

sliders.forEach(function(slider, i){
    slider.addEventListener('input', function(){
    updateValue(slider, slider_value[i]);
    });
});