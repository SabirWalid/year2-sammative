document.addEventListener("DOMContentLoaded", function() {
    // Initialize Charts
    initializeCharts();
  
    // Load room data
    loadRoomData();
  
    // Load maintenance requests
    loadMaintenanceRequests();
  
    // Load alerts
    loadAlerts();
  
    // Show and hide sections
    const sections = {
      dataVisualization: document.getElementById('data-visualization'),
      roomManagement: document.getElementById('rooms'),
      maintenanceRequests: document.getElementById('maintenance-requests'),
      alerts: document.getElementById('alerts')
    };
  
    function showSection(sectionId) {
      Object.values(sections).forEach(section => section.classList.remove('active'));
      if (sections[sectionId]) {
        sections[sectionId].classList.add('active');
      }
    }
  
    document.getElementById('data-visualization-btn').addEventListener('click', () => showSection('dataVisualization'));
    document.getElementById('room-management-btn').addEventListener('click', () => showSection('roomManagement'));
    document.getElementById('maintenance-requests-btn').addEventListener('click', () => showSection('maintenanceRequests'));
    document.getElementById('alerts-btn').addEventListener('click', () => showSection('alerts'));
  
    // Theme switcher functionality
    const themeSwitcher = document.getElementById('theme-switcher');
    themeSwitcher.addEventListener('click', toggleTheme);
  
    function toggleTheme() {
      document.body.classList.toggle('theme-light');
      document.body.classList.toggle('theme-dark');
      localStorage.setItem('theme', document.body.classList.contains('theme-light') ? 'light' : 'dark');
    }
  
    // Apply the saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.add(`theme-${savedTheme}`);
    }
  });
  
  function initializeCharts() {
    const ctx = document.getElementById('occupancyChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [{
          label: 'Occupancy Rate',
          data: [12, 19, 3, 5],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  function loadRoomData() {
    const roomData = [
      { number: 101, status: 'Occupied', resident: 'John Doe', amenities: 'WiFi, AC' },
      { number: 102, status: 'Vacant', resident: '-', amenities: 'WiFi' },
      { number: 103, status: 'Under Maintenance', resident: '-', amenities: 'AC' }
    ];
  
    const roomList = document.getElementById('roomList');
    roomData.forEach(room => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${room.number}</td>
        <td>${room.status}</td>
        <td>${room.resident}</td>
        <td>${room.amenities}</td>
      `;
      roomList.appendChild(row);
    });
  }
  
  function loadMaintenanceRequests() {
    const requests = [
      { room: 101, status: 'Pending', description: 'Leaky faucet' },
      { room: 102, status: 'Ongoing', description: 'Broken window' },
      { room: 103, status: 'Completed', description: 'AC repair' }
    ];
  
    const maintenanceRequests = document.getElementById('maintenanceRequests');
    requests.forEach(request => {
      const div = document.createElement('div');
      div.className = 'card mb-3';
      div.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">Room ${request.room}</h5>
          <p class="card-text">${request.description}</p>
          <p class="card-text"><small class="text-muted">${request.status}</small></p>
        </div>
      `;
      maintenanceRequests.appendChild(div);
    });
  }
  
  function loadAlerts() {
    const alerts = [
      { message: 'Upcoming room inspections tomorrow at 10 AM.', type: 'info' },
      { message: 'Maintenance deadline for Room 102 today.', type: 'warning' },
      { message: 'Urgent: Resident in Room 101 requires assistance.', type: 'danger' }
    ];
  
    const alertsDiv = document.getElementById('alerts');
    alerts.forEach(alert => {
      const div = document.createElement('div');
      div.className = `alert alert-${alert.type}`;
      div.textContent = alert.message;
      alertsDiv.appendChild(div);
    });
  }
  