async function fetchNeoData() {
  const neoCountEl = document.getElementById('neo-count');
  const hazardousChartCtx = document.getElementById('hazardous-chart');
  const neoListEl = document.getElementById('neo-list');

  const API_BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 7);

  const formatDate = (date) => date.toISOString().split('T')[0];
  const startDateStr = formatDate(today);
  const endDateStr = formatDate(endDate);

  const apiUrl = `${API_BASE_URL}?start_date=${startDateStr}&end_date=${endDateStr}&api_key=${NASA_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const neoData = data.near_earth_objects;
    let allNeos = [];
    Object.keys(neoData).forEach(date => {
      allNeos = allNeos.concat(neoData[date]);
    });

    neoCountEl.textContent = allNeos.length;

    const hazardousCount = allNeos.filter(neo => neo.is_potentially_hazardous_asteroid).length;
    const nonHazardousCount = allNeos.length - hazardousCount;

    new Chart(hazardousChartCtx, {
      type: 'pie',
      data: {
        labels: ['Potencialmente Perigoso', 'Não Perigoso'],
        datasets: [{
          data: [hazardousCount, nonHazardousCount],
          backgroundColor: ['#dc3545', '#0d6efd'],
        }]
      }
    });

    neoListEl.innerHTML = '';
    allNeos.sort((a, b) => new Date(a.close_approach_data[0].close_approach_date) - new Date(b.close_approach_data[0].close_approach_date));

    allNeos.forEach(neo => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item d-flex justify-content-between align-items-start';
      const diameter = neo.estimated_diameter.meters.estimated_diameter_max.toFixed(2);
      const closeApproachDate = new Date(neo.close_approach_data[0].close_approach_date_full).toLocaleString();
      listItem.innerHTML = `
        <div>
          <div class="fw-bold">${neo.name}</div>
          Aproximação: ${closeApproachDate} | Diâmetro: ~${diameter} m
        </div>
        ${neo.is_potentially_hazardous_asteroid ? '<span class="badge bg-danger rounded-pill">Perigoso!</span>' : ''}
      `;
      neoListEl.appendChild(listItem);
    });

  } catch (error) {
    console.error('Error fetching NEO data:', error);
    neoListEl.innerHTML = '<li class="list-group-item text-danger">Falha ao carregar dados da NASA.</li>';
  }
}