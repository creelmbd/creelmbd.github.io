class VitalsComponent {
  constructor() {
      this.data = {
          systemHealth: {
              value: '98.6%',
              trend: '+0.2%',
              status: 'normal',
              range: 'Target: >98%'
          },
          responseTime: {
              value: '42ms',
              trend: '-5ms',
              status: 'normal',
              range: 'Target: <100ms'
          },
          memory: {
              value: '72%',
              trend: 'stable',
              status: 'normal',
              range: 'Target: <80%'
          },
          cpuLoad: {
              value: '0.65',
              trend: '-0.1',
              status: 'normal',
              range: 'Target: <1.0'
          }
      };

      this.systemMetrics = {
          aws: {
              ec2: { value: '12 Active', status: 'normal' },
              rds: { value: 'Healthy', status: 'optimal' },
              s3: { value: '2.4 TB', status: 'normal' }
          },
          containers: {
              docker: { value: '45 Running', status: 'normal' },
              kubernetes: { value: '28/30 Ready', status: 'warning' },
              registry: { value: '860 GB', status: 'normal' }
          },
          cicd: {
              buildSuccess: { value: '98.2%', status: 'success' },
              deployFreq: { value: '12/day', status: 'normal' },
              leadTime: { value: '45 mins', status: 'normal' }
          }
      };

      this.refreshInterval = null;
  }

  initialize() {
      this.render();
      this.attachEventListeners();
      this.startAutoRefresh();
  }

  render() {
      const container = document.querySelector('.vitals-container');
      if (!container) return;

      container.innerHTML = `
          ${this.renderHeader()}
          ${this.renderVitalsGrid()}
          ${this.renderSystemsGrid()}
      `;
  }

  renderHeader() {
      return `
          <div class="vitals-header">
              <h2>System Vitals</h2>
              <div class="header-actions">
                  <button class="refresh-btn">
                      <i class="fas fa-sync"></i>
                      Refresh
                  </button>
                  <span class="last-checked">Last checked: Just now</span>
              </div>
          </div>
      `;
  }

  renderVitalsGrid() {
      return `
          <div class="vitals-grid">
              ${this.renderVitalSign('System Health', this.data.systemHealth)}
              ${this.renderVitalSign('Response Time', this.data.responseTime)}
              ${this.renderVitalSign('Memory Utilization', this.data.memory)}
              ${this.renderVitalSign('CPU Load', this.data.cpuLoad)}
          </div>
      `;
  }

  renderVitalSign(label, data) {
      return `
          <div class="vital-sign">
              <div class="vital-label">${label}</div>
              <div class="vital-value ${data.status}">${data.value}</div>
              <div class="vital-trend">
                  ${this.getTrendIcon(data.trend)}
                  ${data.trend}
              </div>
              <div class="vital-range">${data.range}</div>
          </div>
      `;
  }

  renderSystemsGrid() {
      return `
          <div class="systems-grid">
              ${this.renderSystemGroup('AWS Infrastructure', this.systemMetrics.aws)}
              ${this.renderSystemGroup('Container Health', this.systemMetrics.containers)}
              ${this.renderSystemGroup('CI/CD Pipeline', this.systemMetrics.cicd)}
          </div>
      `;
  }

  renderSystemGroup(title, metrics) {
      return `
          <div class="system-group">
              <h3>${title}</h3>
              ${Object.entries(metrics).map(([key, data]) => `
                  <div class="metric-row">
                      <span class="metric-label">${this.formatLabel(key)}</span>
                      <span class="metric-value ${data.status}">${data.value}</span>
                  </div>
              `).join('')}
          </div>
      `;
  }

  getTrendIcon(trend) {
      if (trend.includes('+') || trend.includes('up')) {
          return '<i class="fas fa-arrow-up"></i>';
      } else if (trend.includes('-') || trend.includes('down')) {
          return '<i class="fas fa-arrow-down"></i>';
      }
      return '<i class="fas fa-minus"></i>';
  }

  formatLabel(key) {
      return key
          .split(/(?=[A-Z])/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
  }

  attachEventListeners() {
      const container = document.querySelector('.vitals-container');
      if (!container) return;

      container.querySelector('.refresh-btn')?.addEventListener('click', () => {
          this.refreshData();
      });
  }

  startAutoRefresh() {
      this.refreshInterval = setInterval(() => {
          this.refreshData();
      }, 30000); // Refresh every 30 seconds
  }

  async refreshData() {
      try {
          // Simulate API call to fetch new data
          await this.fetchVitalsData();
          this.updateLastChecked();
          this.render();
      } catch (error) {
          console.error('Error refreshing vitals data:', error);
      }
  }

  async fetchVitalsData() {
      // Simulate API call
      return new Promise(resolve => {
          setTimeout(() => {
              // Update some values to simulate real-time changes
              this.data.systemHealth.value = `${(98 + Math.random() * 1.5).toFixed(1)}%`;
              this.data.responseTime.value = `${Math.floor(40 + Math.random() * 10)}ms`;
              resolve();
          }, 500);
      });
  }

  updateLastChecked() {
      const timeElement = document.querySelector('.last-checked');
      if (timeElement) {
          timeElement.textContent = `Last checked: Just now`;
      }
  }

  destroy() {
      if (this.refreshInterval) {
          clearInterval(this.refreshInterval);
      }
  }
}