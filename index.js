const username = 'coalition';
const password = 'skills-test';

const headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));


// functtion to fetch data from api
fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
  method: "GET",
  headers: headers
})

  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();  
  })
  .then(data => {
    console.log(data)
    const fourthData = data[3]
    const diagnosisHistory = fourthData.diagnosis_history;

    const lastSixMonths = diagnosisHistory.slice(-6); // last six months from the Jessica Taylor data from the api 

    //value for graph
    const date = lastSixMonths.map(entry => `${entry.month}-${entry.year}`)
    const xValue = lastSixMonths.map(entry => entry.blood_pressure.diastolic.value);
    const xValue1 = lastSixMonths.map(entry => entry.blood_pressure.systolic.value);

    
    // functtion to plot the graph
    const ctx = document.querySelector('#diagnosis-history-chart').getContext('2d');

    const theChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: date,
        datasets: [{
          label: "Systolic",
          data: xValue1,
          borderColor: "pink",
          borderWidth: 1,
          fill: false,
          tension: 0.3
        }, {
          label: "Diastolic",
          data: xValue,
          borderColor: "blue",
          borderWidth: 1,
          fill: false,
          tension: 0.3
        }
      ]
      },

      options: {
        scales: {
          x: {
            title: {
              display: false,
              text: 'Month-Year'
            }
          },
          y: {
            beginAtZero: false,
                title: {
                  display: false,
                  text: 'Blood Pressure (Diastolic/Systolic)'
            }
          }
        }
      }

    })


    // value for diagnosis-mini-info
    
    const latestRespiratoryValue = diagnosisHistory[diagnosisHistory.length - 1]?.respiratory_rate.value
    const latestRespiratoryLevel = diagnosisHistory[diagnosisHistory.length - 1]?.respiratory_rate.levels   
    
    const latestTempValue = diagnosisHistory[diagnosisHistory.length - 1]?.temperature
    .value
    const latestTemplevel = diagnosisHistory[diagnosisHistory.length - 1]?.temperature
    .levels

    const latestHeartbpmValue = diagnosisHistory[diagnosisHistory.length - 1]?.heart_rate
    .value
    const latestHeartbpmLevel = diagnosisHistory[diagnosisHistory .length- 1]?.heart_rate
    .levels 

    // put data into html 
    document.querySelector(".mini-info-resp").innerHTML = `${latestRespiratoryValue} bpm`
    document.querySelector(".mini-info-respi-level").innerText = `${latestRespiratoryLevel}`
 
    document.querySelector(".mini-info-temp").innerText = `${latestTempValue} °F`
    document.querySelector(".mini-info-temp-level").innerText = `${latestTemplevel}`

    document.querySelector(".mini-info-heart").innerText = `${latestHeartbpmValue} bpm`
    document.querySelector(".mini-info-heart-level").innerText = `${latestHeartbpmLevel}`


    // Diagnostic list
   const diagnosticList =  fourthData.diagnostic_list;


    const diagnosisDetailOne = diagnosticList[0]?.name
    const diagnosisDetailTwo = diagnosticList[0]?.description
    const diagnosisDetailThree = diagnosticList[0]?.status

    const diagnosisDetailFour = diagnosticList[1]?.name
    const diagnosisDetailFive = diagnosticList[1]?.description
    const diagnosisDetailSix = diagnosticList[1]?.status

    const diagnosisDetailSeven = diagnosticList[2]?.name
    const diagnosisDetailEight = diagnosticList[2]?.description
    const diagnosisDetailNine = diagnosticList[2]?.status

    const diagnosisDetailTen = diagnosticList[3]?.name
    const diagnosisDetailEleven = diagnosticList[3]?.description
    const diagnosisDetailTwelve = diagnosticList[3]?.status
    
    document.querySelector(".diagnosis-detail-one").innerText = diagnosisDetailOne
    document.querySelector(".diagnosis-detail-two").innerText = diagnosisDetailTwo
    document.querySelector(".diagnosis-detail-three").innerText = diagnosisDetailThree
    document.querySelector(".diagnosis-detail-four").innerText = diagnosisDetailFour
    document.querySelector(".diagnosis-detail-five").innerText = diagnosisDetailFive
    document.querySelector(".diagnosis-detail-six").innerText = diagnosisDetailSix
    document.querySelector(".diagnosis-detail-seven").innerText = diagnosisDetailSeven
    document.querySelector(".diagnosis-detail-eight").innerText = diagnosisDetailEight
    document.querySelector(".diagnosis-detail-nine").innerText = diagnosisDetailNine
    document.querySelector(".diagnosis-detail-ten").innerText = diagnosisDetailTen
    document.querySelector(".diagnosis-detail-eleven").innerText = diagnosisDetailEleven
    document.querySelector(".diagnosis-detail-twelve").innerText = diagnosisDetailTwelve

  // info

  const herName = fourthData?.name 
  const dob =  fourthData?.date_of_birth
  const gender = fourthData?.gender
  const phoneNumber = fourthData?.phone_number
  const emergency = fourthData?.emergency_contact
  const insurance = fourthData?.insurance_type
  const picture = fourthData?.profile_picture ?? "https://fedskillstest.ct.digital/4.png"

  console.log(herName)
  document.querySelector("#name").innerText = herName
  document.querySelector(".doB").innerText = dob
  document.querySelector("#gender").innerText = gender
  document.querySelector("#contact").innerText = phoneNumber
  document.querySelector("#emergency").innerText = emergency
  document.querySelector("#insurance").innerText = insurance
  document.querySelector(".profile-pic").src = picture


  // lab-results
  
  const labResults = fourthData.lab_results
  
   const labResultOne = labResults[0]
   const labResultTwo = labResults[1]
   const labResultThree = labResults[2]
   const labResultFour = labResults[3]

   document.querySelector(".result-para-one").innerText = labResultOne
   document.querySelector(".result-para-two").innerText = labResultTwo
   document.querySelector(".result-para-three").innerText = labResultThree
   document.querySelector(".result-para-four").innerText = labResultFour



  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });


