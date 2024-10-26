class EMRInterface {
  constructor() {
      this.sidebar = document.querySelector('.emr-sidebar');
      this.mainContent = document.getElementById('mainContent');
      this.sidebarToggle = document.getElementById('sidebarToggle');
      this.currentView = 'summary';
  }

  initialize() {
      console.log('Initializing EMR Interface');
      this.loadDefaultView();
      this.initializeNavigation();
      this.initializeSidebar();
      this.loadComponents();
  }

  loadComponents() {
      // Initialize static components
      this.vitalsComponent = {
          initialize: () => this.renderVitals(),
          getContent: () => this.getVitalsContent()
      };

      this.progressNotesComponent = {
          initialize: () => this.renderProgressNotes(),
          getContent: () => this.getProgressNotesContent()
      };

      this.ordersComponent = {
          initialize: () => this.renderOrders(),
          getContent: () => this.getOrdersContent()
      };

      this.resultsComponent = {
          initialize: () => this.renderResults(),
          getContent: () => this.getResultsContent()
      };
  }

  loadDefaultView() {
      // Load summary view by default
      this.mainContent.innerHTML = this.getSummaryContent();
      console.log('Default view loaded');
  }

  initializeNavigation() {
      // Set up nav icon clicks
      document.querySelectorAll('.nav-icon[data-view]').forEach(icon => {
          icon.addEventListener('click', (e) => {
              const view = e.currentTarget.dataset.view;
              this.switchView(view);
              this.updateActiveIcon(icon);
          });
      });

      // Set up sidebar navigation
      document.querySelectorAll('.sidebar-nav a').forEach(link => {
          link.addEventListener('click', (e) => {
              e.preventDefault();
              const view = e.currentTarget.getAttribute('href').slice(1);
              this.switchView(view);
              this.updateActiveNavItem(e.currentTarget);
          });
      });
  }

  initializeSidebar() {
      if (this.sidebarToggle) {
          this.sidebarToggle.addEventListener('click', () => {
              this.sidebar.classList.toggle('active');
          });
      }
  }

  switchView(view) {
      console.log('Switching to view:', view);
      this.currentView = view;

      let content = '';
      switch(view) {
          case 'summary':
              content = this.getSummaryContent();
              break;
          case 'vitals':
              content = this.getVitalsContent();
              break;
          case 'notes':
              content = this.getProgressNotesContent();
              break;
          case 'orders':
              content = this.getOrdersContent();
              break;
          case 'results':
              content = this.getResultsContent();
              break;
          default:
              content = this.getSummaryContent();
      }

      this.mainContent.innerHTML = content;
  }

  updateActiveIcon(activeIcon) {
      document.querySelectorAll('.nav-icon').forEach(icon => {
          icon.classList.remove('active');
      });
      activeIcon.classList.add('active');
  }

  updateActiveNavItem(activeItem) {
      document.querySelectorAll('.sidebar-nav a').forEach(item => {
          item.classList.remove('active');
      });
      activeItem.classList.add('active');
  }

  // Content template methods
  getSummaryContent() {
      return `
          <div class="summary-view">
              <div class="patient-banner">
                  <div class="banner-content">
                      <h1>Brian Creelman</h1>
                      <div class="patient-info">
                          <span>Senior DevOps Engineer</span>
                          <span>Boston, MA</span>
                          <span class="status active">Active</span>
                      </div>
                  </div>
              </div>

              <div class="content-grid">
                  <div class="vitals-summary">
                      ${this.getVitalsContent()}
                  </div>
                  <div class="recent-activity">
                      ${this.getProgressNotesContent()}
                  </div>
              </div>
          </div>
      `;
  }

  getVitalsContent() {
      return `
          <div class="vitals-container">
              <h2>System Vitals</h2>
              <div class="vitals-grid">
                  <!-- Vitals content -->
              </div>
          </div>
      `;
  }

  getProgressNotesContent() {
      return `
          <div class="progress-notes">
              <h2>Progress Notes</h2>
              <!-- Progress notes content -->
          </div>
      `;
  }

  getOrdersContent() {
      return `
          <div class="orders-container">
              <h2>Active Projects</h2>
              <!-- Orders/Projects content -->
          </div>
      `;
  }

  getResultsContent() {
      return `
          <div class="results-container">
              <h2>Results & Certifications</h2>
              <!-- Results content -->
          </div>
      `;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Document ready');
  window.emrInterface = new EMRInterface();
  window.emrInterface.initialize();
});