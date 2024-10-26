class ProgressNotesComponent {
  constructor() {
      this.experiences = [
          {
              period: '2021 - Present',
              company: 'Digital Asset Custody Company',
              role: 'Senior DevOps Engineer',
              details: [
                  'Lead DevOps engineer responsible for infrastructure automation and cloud architecture',
                  'Implemented comprehensive CI/CD pipelines reducing deployment time by 60%',
                  'Managed AWS infrastructure including EC2, RDS, and containerized applications',
                  'Established monitoring and alerting systems using Grafana and Prometheus'
              ],
              technologies: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Python'],
              status: 'Current Position'
          },
          // Add more experience entries here
      ];
  }

  initialize() {
      this.render();
      this.attachEventListeners();
  }

  render() {
      const container = document.querySelector('.progress-notes');
      if (!container) return;

      container.innerHTML = `
          ${this.renderHeader()}
          ${this.experiences.map(exp => this.renderExperienceEntry(exp)).join('')}
      `;
  }

  renderHeader() {
      return `
          <div class="notes-header">
              <h2>Professional Progress Notes</h2>
              <div class="notes-filter">
                  <select class="filter-select">
                      <option>All Entries</option>
                      <option>Last 6 Months</option>
                      <option>Last Year</option>
                  </select>
              </div>
          </div>
      `;
  }

  renderExperienceEntry(experience) {
      return `
          <div class="note-entry">
              <div class="note-header">
                  <span class="note-date">${experience.period}</span>
                  <span class="note-author">${experience.company}</span>
              </div>
              <div class="note-content">
                  <h4>${experience.role}</h4>
                  <div class="note-details">
                      <ul>
                          ${experience.details.map(detail => `
                              <li>${detail}</li>
                          `).join('')}
                      </ul>
                  </div>
                  <div class="technologies-used">
                      ${experience.technologies.map(tech => `
                          <span class="tech-tag">${tech}</span>
                      `).join('')}
                  </div>
              </div>
              <div class="note-footer">
                  <span class="note-status">${experience.status}</span>
                  ${this.renderNoteActions()}
              </div>
          </div>
      `;
  }

  renderNoteActions() {
      return `
          <div class="note-actions">
              <button class="action-btn" data-action="expand">
                  <i class="fas fa-expand-alt"></i>
              </button>
              <button class="action-btn" data-action="share">
                  <i class="fas fa-share"></i>
              </button>
          </div>
      `;
  }

  attachEventListeners() {
      const container = document.querySelector('.progress-notes');
      if (!container) return;

      // Filter change handler
      container.querySelector('.filter-select')?.addEventListener('change', (e) => {
          this.filterNotes(e.target.value);
      });

      // Note action handlers
      container.querySelectorAll('.action-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
              const action = e.currentTarget.dataset.action;
              this.handleNoteAction(action, e.currentTarget.closest('.note-entry'));
          });
      });
  }

  filterNotes(filter) {
      // Implement filtering logic
      console.log('Filtering notes by:', filter);
  }

  handleNoteAction(action, noteEntry) {
      switch(action) {
          case 'expand':
              this.expandNote(noteEntry);
              break;
          case 'share':
              this.shareNote(noteEntry);
              break;
      }
  }

  expandNote(noteEntry) {
      // Implement note expansion
      console.log('Expanding note:', noteEntry);
  }

  shareNote(noteEntry) {
      // Implement note sharing
      console.log('Sharing note:', noteEntry);
  }

  // For summary view
  getRecentTemplate() {
      return this.renderExperienceEntry(this.experiences[0]);
  }
}