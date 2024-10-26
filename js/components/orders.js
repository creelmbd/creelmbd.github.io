class OrdersComponent {
  constructor() {
      this.projects = [
          {
              id: 'PRJ-001',
              title: 'Kubernetes Migration',
              description: 'Migrating legacy applications to containerized infrastructure',
              status: 'in-progress',
              priority: 'high',
              completion: 65,
              timeframe: 'Q1 2024',
              team: ['Brian C.', 'DevOps Team'],
              metrics: {
                  uptime: '99.99%',
                  deployments: '12/day',
                  incidents: '0'
              },
              tasks: [
                  { task: 'Container Strategy', status: 'completed' },
                  { task: 'Infrastructure Setup', status: 'completed' },
                  { task: 'Application Migration', status: 'in-progress' },
                  { task: 'Testing & Validation', status: 'pending' }
              ]
          },
          {
              id: 'PRJ-002',
              title: 'Monitoring Enhancement',
              description: 'Implementing advanced observability with Grafana and Prometheus',
              status: 'active',
              priority: 'medium',
              completion: 45,
              timeframe: 'Q2 2024',
              team: ['Brian C.', 'SRE Team'],
              metrics: {
                  coverage: '85%',
                  alerts: 'Configured',
                  dashboards: '12'
              },
              tasks: [
                  { task: 'Metrics Definition', status: 'completed' },
                  { task: 'Dashboard Creation', status: 'in-progress' },
                  { task: 'Alert Configuration', status: 'in-progress' },
                  { task: 'Documentation', status: 'pending' }
              ]
          }
      ];
  }

  initialize() {
      this.render();
      this.attachEventListeners();
  }

  render() {
      const container = document.querySelector('.orders-container');
      if (!container) return;

      container.innerHTML = `
          ${this.renderHeader()}
          <div class="active-orders">
              ${this.projects.map(project => this.renderProjectCard(project)).join('')}
          </div>
      `;
  }

  renderHeader() {
      return `
          <div class="orders-header">
              <div class="header-left">
                  <h2>Active Projects</h2>
                  <span class="project-count">${this.projects.length} Active</span>
              </div>
              <div class="header-actions">
                  <button class="action-btn filter-btn">
                      <i class="fas fa-filter"></i>
                      Filter
                  </button>
                  <button class="action-btn new-project-btn">
                      <i class="fas fa-plus"></i>
                      New Project
                  </button>
              </div>
          </div>
          ${this.renderFilters()}
      `;
  }

  renderFilters() {
      return `
          <div class="order-filters" style="display: none;">
              <button class="filter-chip active" data-filter="all">All</button>
              <button class="filter-chip" data-filter="in-progress">In Progress</button>
              <button class="filter-chip" data-filter="pending">Pending</button>
              <button class="filter-chip" data-filter="completed">Completed</button>
          </div>
      `;
  }

  renderProjectCard(project) {
      return `
          <div class="order-item" data-project-id="${project.id}">
              <div class="order-status">
                  <span class="status-indicator ${project.status}"></span>
                  <span class="status-text">${this.formatStatus(project.status)}</span>
                  <span class="priority-badge ${project.priority}">${project.priority}</span>
              </div>

              <div class="order-details">
                  <div class="order-info">
                      <h4>${project.title}</h4>
                      <p>${project.description}</p>
                      <div class="order-meta">
                          <span class="timeframe">
                              <i class="fas fa-calendar"></i>
                              ${project.timeframe}
                          </span>
                          <span class="team">
                              <i class="fas fa-users"></i>
                              ${project.team.join(', ')}
                          </span>
                      </div>
                  </div>

                  <div class="order-progress">
                      <div class="progress-bar">
                          <div class="progress" style="width: ${project.completion}%"></div>
                      </div>
                      <span class="progress-text">${project.completion}% Complete</span>
                  </div>
              </div>

              <div class="order-metrics">
                  ${Object.entries(project.metrics).map(([key, value]) => `
                      <div class="metric-item">
                          <span class="metric-label">${this.formatMetricLabel(key)}</span>
                          <span class="metric-value">${value}</span>
                      </div>
                  `).join('')}
              </div>

              <div class="order-tasks">
                  ${project.tasks.map(task => this.renderTask(task)).join('')}
              </div>

              <div class="order-actions">
                  <button class="action-btn" data-action="edit">
                      <i class="fas fa-edit"></i>
                      Edit
                  </button>
                  <button class="action-btn" data-action="details">
                      <i class="fas fa-external-link-alt"></i>
                      Details
                  </button>
              </div>
          </div>
      `;
  }

  renderTask(task) {
      return `
          <div class="task-item ${task.status}">
              <span class="task-status-icon"></span>
              <span class="task-name">${task.task}</span>
              <span class="task-status">${this.formatStatus(task.status)}</span>
          </div>
      `;
  }

  attachEventListeners() {
      const container = document.querySelector('.orders-container');
      if (!container) return;

      // Filter toggle
      container.querySelector('.filter-btn')?.addEventListener('click', () => {
          const filters = container.querySelector('.order-filters');
          filters.style.display = filters.style.display === 'none' ? 'flex' : 'none';
      });

      // Filter chips
      container.querySelectorAll('.filter-chip').forEach(chip => {
          chip.addEventListener('click', (e) => {
              this.filterProjects(e.currentTarget.dataset.filter);
          });
      });

      // Project actions
      container.querySelectorAll('.order-actions .action-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
              const action = e.currentTarget.dataset.action;
              const projectId = e.currentTarget.closest('.order-item').dataset.projectId;
              this.handleProjectAction(action, projectId);
          });
      });
  }

  filterProjects(filter) {
      // Update active filter
      document.querySelectorAll('.filter-chip').forEach(chip => {
          chip.classList.toggle('active', chip.dataset.filter === filter);
      });

      // Filter projects
      const projects = document.querySelectorAll('.order-item');
      projects.forEach(project => {
          const status = project.querySelector('.status-text').textContent.toLowerCase();
          project.style.display = (filter === 'all' || status === filter) ? 'block' : 'none';
      });
  }

  handleProjectAction(action, projectId) {
      switch(action) {
          case 'edit':
              this.editProject(projectId);
              break;
          case 'details':
              this.showProjectDetails(projectId);
              break;
      }
  }

  formatStatus(status) {
      return status.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
  }

  formatMetricLabel(label) {
      return label.split(/(?=[A-Z])/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
  }

  editProject(projectId) {
      console.log('Editing project:', projectId);
      // Implement project edit functionality
  }

  showProjectDetails(projectId) {
      console.log('Showing details for project:', projectId);
      // Implement project details view
  }
}