class EMRController {
  constructor() {
      this.components = {
          patientBanner: new PatientBannerComponent(),
          vitals: new VitalsComponent(),
          progressNotes: new ProgressNotesComponent(),
          orders: new OrdersComponent(),
          results: new ResultsComponent()
      };

      this.currentView = 'summary';
      this.sidebarActive = false;

      this.initialize();
  }

  initialize() {
      // Initialize navigation
      this.initializeNavigation();

      // Initialize sidebar
      this.initializeSidebar();

      // Load default view
      this.loadView('summary');

      // Set up refresh interval
      this.startRefreshTimer();
  }

  initializeNavigation() {
      // Set up nav icon clicks
      document.querySelectorAll('.nav-icon[data-view]').forEach(icon => {
          icon.addEventListener('click', (e) => {
              const view = e.currentTarget.dataset.view;
              this.loadView(view);
              this.updateActiveIcon(icon);
          });
      });

      // Set up tab navigation
      document.querySelectorAll('.tab-btn').forEach(tab => {
          tab.addEventListener('click', (e) => {
              const tabView = e.currentTarget.dataset.tab;
              this.switchTab(tabView);
          });
      });
  }

  initializeSidebar() {
      const toggleBtn = document.getElementById('sidebarToggle');
      const sidebar = document.querySelector('.emr-sidebar');
      const mainContent = document.querySelector('.emr-main');

      toggleBtn?.addEventListener('click', () => {
          this.sidebarActive = !this.sidebarActive;
          sidebar.classList.toggle('active', this.sidebarActive);
          mainContent.classList.toggle('sidebar-active', this.sidebarActive);
      });
  }

  loadView(view) {
      this.currentView = view;
      this.showLoading();

      try {
          // Update main content based on view
          const content = this.getViewContent(view);
          document.getElementById('mainContent').innerHTML = content;

          // Initialize components for the view
          this.initializeViewComponents(view);
      } catch (error) {
          console.error('Error loading view:', error);
          this.showError('Error loading content');
      } finally {
          this.hideLoading();
      }
  }

  getViewContent(view) {
      switch(view) {
          case 'summary':
              return this.components.vitals.getSummaryTemplate() +
                     this.components.progressNotes.getRecentTemplate();
          case 'vitals':
              return this.components.vitals.getFullTemplate();
          case 'notes':
              return this.components.progressNotes.getFullTemplate();
          case 'orders':
              return this.components.orders.getTemplate();
          case 'results':
              return this.components.results.getTemplate();
          default:
              return '<div class="error-message">View not found</div>';
      }
  }

  initializeViewComponents(view) {
      // Initialize relevant components based on view
      switch(view) {
          case 'summary':
              this.components.vitals.initialize();
              this.components.progressNotes.initializeRecent();
              break;
          case 'vitals':
              this.components.vitals.initialize();
              break;
          case 'notes':
              this.components.progressNotes.initialize();
              break;
          case 'orders':
              this.components.orders.initialize();
              break;
          case 'results':
              this.components.results.initialize();
              break;
      }
  }

  updateActiveIcon(activeIcon) {
      document.querySelectorAll('.nav-icon').forEach(icon => {
          icon.classList.remove('active');
      });
      activeIcon.classList.add('active');
  }

  switchTab(tabView) {
      // Update tab buttons
      document.querySelectorAll('.tab-btn').forEach(tab => {
          tab.classList.toggle('active', tab.dataset.tab === tabView);
      });

      // Load tab content
      this.loadView(tabView);
  }

  startRefreshTimer() {
      // Refresh vital signs every 30 seconds
      setInterval(() => {
          if (this.currentView === 'vitals' || this.currentView === 'summary') {
              this.components.vitals.refreshData();
          }
      }, 30000);
  }

  showLoading() {
      const loader = document.getElementById('loadingIndicator');
      if (loader) loader.classList.remove('hidden');
  }

  hideLoading() {
      const loader = document.getElementById('loadingIndicator');
      if (loader) loader.classList.add('hidden');
  }

  showError(message) {
      // Implement error notification
      console.error(message);
  }
}

// Initialize EMR when document is ready
document.addEventListener('DOMContentLoaded', () => {
  window.emr = new EMRController();
});