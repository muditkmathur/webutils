function calculateRateFromAreaAndValue() {

  const value = document.getElementById("final_value").value.replaceAll(',', '');
  document.getElementById("final_value").value = convertToRupeesFormat(value);

  const area = document.getElementById("area").value;
  const areaUnitSelected = document.getElementById("area_unit").selectedIndex;
  
  var ratePerSqFt=value/area;
  var ratePerSqMt=value/area;
  var ratePerSqAc=value/area;

  // calculate the values and set
  if (areaUnitSelected==0){ // per sqft to others
    ratePerSqMt /= 10.7639;
    ratePerSqAc /= 43560;
  } else if (areaUnitSelected==1){ // per sqmt to others
    ratePerSqFt *= 10.7639;
    ratePerSqAc *= 4046.855;
  } else if (areaUnitSelected==2){ // per acres to others
    ratePerSqFt /= 43560;
    ratePerSqMt /= 4046.855;
  }

  document.getElementById("persqft").innerHTML=convertToRupeesFormat(ratePerSqFt);
  document.getElementById("persqmt").innerHTML=convertToRupeesFormat(ratePerSqMt);
  document.getElementById("perac").innerHTML=convertToRupeesFormat(ratePerSqAc);

  const rateUnitSelected = document.getElementById("rate_unit").selectedIndex;

  // calculate the values and set
  if (rateUnitSelected==0){ // per sqft to others
    document.getElementById("rate").value=document.getElementById("persqft").innerHTML.replaceAll(',', '');
  } else if (rateUnitSelected==1){ // per sqmt to others
    document.getElementById("rate").value=document.getElementById("persqmt").innerHTML.replaceAll(',', '');
  } else if (rateUnitSelected==2){ // per acres to others
    document.getElementById("rate").value=document.getElementById("perac").innerHTML.replaceAll(',', '');
  }
}

function calculateRateInOtherDimentions() {

  const rate = document.getElementById("rate").value;
  const rateUnitSelected = document.getElementById("rate_unit").selectedIndex;
  
  var ratePerSqFt=rate;
  var ratePerSqMt=rate;
  var ratePerSqAc=rate;

  // calculate the values and set
  if (rateUnitSelected==0){ // sqft to others
    ratePerSqMt=rate * 10.7639;
    ratePerSqAc=(rate * 43560);
  } else if (rateUnitSelected==1){ // sqmt to others
    ratePerSqFt=rate / 10.7639;
    ratePerSqAc=rate * 4046.855 + " ("+ (rate * 4046.855) + "L)";
  } else if (rateUnitSelected==2){ // acres to others
    ratePerSqFt=rate / 43560;
    ratePerSqMt=rate / 4046.855;
  }

  document.getElementById("persqft").innerHTML=convertToRupeesFormat(ratePerSqFt);
  document.getElementById("persqmt").innerHTML=convertToRupeesFormat(ratePerSqMt);
  document.getElementById("perac").innerHTML=convertToRupeesFormat(ratePerSqAc);

}

function calculateValue() {
  
  calculateRateInOtherDimentions();
  const rateUnitSelected = document.getElementById("rate_unit").selectedIndex;
  const rate = document.getElementById("rate").value;
  const areaUnitSelected = document.getElementById("area_unit").selectedIndex;
  const area = document.getElementById("area").value;
  
  var finalValue = rate * area;
  // calculate the values and set
  if (areaUnitSelected!=rateUnitSelected){ // sqft to others
    if (rateUnitSelected==0){ // acres to others
      switch(areaUnitSelected) {
          case 1:
            finalValue *= 10.7639;
            break;
          case 2:
            finalValue *= 43560;
            break;
      }
    } else if (rateUnitSelected==1){ // acres to others
      switch(areaUnitSelected) {
          case 0:
            finalValue /= 10.7639;
            break;
          case 2:
            finalValue *= 4046.855;
            break;
      }
    } else if (rateUnitSelected==2){ // acres to others
      switch(areaUnitSelected) {
          case 0:
            finalValue /= 43560;
            break;
          case 1:
            finalValue /= 4046.855;
            break;
      }
    }
  }
  
  document.getElementById("final_value").value=convertToRupeesFormat(finalValue);
}

function convertToRupeesFormat(value){
  return Number(value).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
}
