<template>
  <q-page class="profile-page">
    <!-- Cover & Avatar Section -->
    <div class="profile-cover">
      <div class="cover-image">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop"
          alt="Cover"
        />
        <div class="cover-overlay"></div>
      </div>

      <div class="cover-actions">
        <q-btn flat round icon="photo_camera" color="white" class="cover-btn">
          <q-tooltip>Alterar capa</q-tooltip>
        </q-btn>
      </div>

      <div class="profile-header-content">
        <div class="avatar-section">
          <q-avatar size="150px" class="profile-avatar">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
            <q-btn round color="primary" icon="photo_camera" size="sm" class="avatar-edit-btn">
              <q-tooltip>Alterar foto</q-tooltip>
            </q-btn>
          </q-avatar>

          <div class="profile-badges">
            <q-badge color="positive" class="verified-badge">
              <q-icon name="verified" size="12px" class="q-mr-xs" />
              Verificado
            </q-badge>
            <q-badge color="amber" text-color="dark" class="pro-badge">
              <q-icon name="workspace_premium" size="12px" class="q-mr-xs" />
              PRO
            </q-badge>
          </div>
        </div>

        <div class="profile-info">
          <div class="profile-name-row">
            <h1 class="profile-name">João Silva</h1>
            <q-btn
              outline
              color="white"
              icon="edit"
              label="Editar Perfil"
              class="edit-profile-btn"
            />
          </div>
          <p class="profile-role">Senior Full Stack Developer</p>
          <p class="profile-company">
            <q-icon name="business" size="16px" />
            TechCorp Brasil
          </p>

          <div class="profile-meta">
            <span class="meta-item">
              <q-icon name="location_on" size="16px" />
              São Paulo, Brasil
            </span>
            <span class="meta-item">
              <q-icon name="event" size="16px" />
              Membro desde Jan 2020
            </span>
            <span class="meta-item">
              <q-icon name="link" size="16px" />
              <a href="#">joaosilva.dev</a>
            </span>
          </div>

          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-value">1.2k</span>
              <span class="stat-label">Seguidores</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">348</span>
              <span class="stat-label">Seguindo</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">52</span>
              <span class="stat-label">Projetos</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">4.9</span>
              <span class="stat-label">Avaliação</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="profile-content">
      <div class="row q-col-gutter-lg">
        <!-- Left Column -->
        <div class="col-12 col-lg-4">
          <!-- About Card -->
          <q-card flat class="profile-card q-mb-lg">
            <q-card-section>
              <div class="card-header">
                <h3 class="card-title">
                  <q-icon name="person" class="q-mr-sm" />
                  Sobre
                </h3>
                <q-btn flat round dense icon="edit" size="sm" />
              </div>
              <p class="about-text">
                Desenvolvedor apaixonado por tecnologia com mais de 10 anos de experiência.
                Especialista em Vue.js, Node.js e arquitetura de microsserviços. Sempre em busca de
                novos desafios e aprendizados.
              </p>
            </q-card-section>
          </q-card>

          <!-- Contact Info Card -->
          <q-card flat class="profile-card q-mb-lg">
            <q-card-section>
              <div class="card-header">
                <h3 class="card-title">
                  <q-icon name="contact_mail" class="q-mr-sm" />
                  Contato
                </h3>
                <q-btn flat round dense icon="edit" size="sm" />
              </div>

              <q-list class="contact-list">
                <q-item>
                  <q-item-section avatar>
                    <q-avatar color="primary" text-color="white" size="40px">
                      <q-icon name="email" size="20px" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>E-mail</q-item-label>
                    <q-item-label>joao.silva@email.com</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat round dense icon="content_copy" size="sm" />
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-avatar color="positive" text-color="white" size="40px">
                      <q-icon name="phone" size="20px" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Telefone</q-item-label>
                    <q-item-label>+55 (11) 99999-1234</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat round dense icon="content_copy" size="sm" />
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-avatar color="info" text-color="white" size="40px">
                      <q-icon name="language" size="20px" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Website</q-item-label>
                    <q-item-label>www.joaosilva.dev</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat round dense icon="open_in_new" size="sm" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>

          <!-- Social Links Card -->
          <q-card flat class="profile-card q-mb-lg">
            <q-card-section>
              <div class="card-header">
                <h3 class="card-title">
                  <q-icon name="share" class="q-mr-sm" />
                  Redes Sociais
                </h3>
              </div>

              <div class="social-grid">
                <a href="#" class="social-link github">
                  <q-icon name="fab fa-github" size="24px" />
                  <span>GitHub</span>
                  <span class="social-username">@joaosilva</span>
                </a>
                <a href="#" class="social-link linkedin">
                  <q-icon name="fab fa-linkedin" size="24px" />
                  <span>LinkedIn</span>
                  <span class="social-username">/in/joaosilva</span>
                </a>
                <a href="#" class="social-link twitter">
                  <q-icon name="fab fa-twitter" size="24px" />
                  <span>Twitter</span>
                  <span class="social-username">@joaosilvadev</span>
                </a>
                <a href="#" class="social-link dribbble">
                  <q-icon name="fab fa-dribbble" size="24px" />
                  <span>Dribbble</span>
                  <span class="social-username">@joaosilva</span>
                </a>
              </div>
            </q-card-section>
          </q-card>

          <!-- Skills Card -->
          <q-card flat class="profile-card q-mb-lg">
            <q-card-section>
              <div class="card-header">
                <h3 class="card-title">
                  <q-icon name="psychology" class="q-mr-sm" />
                  Habilidades
                </h3>
                <q-btn flat round dense icon="add" size="sm" />
              </div>

              <div class="skills-list">
                <div v-for="skill in skills" :key="skill.name" class="skill-item">
                  <div class="skill-header">
                    <span class="skill-name">{{ skill.name }}</span>
                    <span class="skill-level">{{ skill.level }}%</span>
                  </div>
                  <q-linear-progress
                    :value="skill.level / 100"
                    :color="skill.color"
                    rounded
                    size="8px"
                    class="skill-bar"
                  />
                </div>
              </div>

              <div class="skill-tags q-mt-md">
                <q-chip
                  v-for="tag in skillTags"
                  :key="tag"
                  outline
                  color="primary"
                  size="sm"
                  clickable
                >
                  {{ tag }}
                </q-chip>
              </div>
            </q-card-section>
          </q-card>

          <!-- Languages Card -->
          <q-card flat class="profile-card">
            <q-card-section>
              <div class="card-header">
                <h3 class="card-title">
                  <q-icon name="translate" class="q-mr-sm" />
                  Idiomas
                </h3>
              </div>

              <q-list class="languages-list">
                <q-item v-for="lang in languages" :key="lang.name">
                  <q-item-section avatar>
                    <span class="flag-icon">{{ lang.flag }}</span>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ lang.name }}</q-item-label>
                    <q-item-label caption>{{ lang.level }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-rating
                      :model-value="lang.stars"
                      readonly
                      size="16px"
                      color="amber"
                      icon="star"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- Right Column -->
        <div class="col-12 col-lg-8">
          <!-- Tabs Navigation -->
          <q-card flat class="profile-card q-mb-lg">
            <q-tabs
              v-model="activeTab"
              class="profile-tabs"
              active-color="primary"
              indicator-color="primary"
              align="left"
            >
              <q-tab name="activity" icon="timeline" label="Atividades" />
              <q-tab name="projects" icon="folder" label="Projetos" />
              <q-tab name="experience" icon="work" label="Experiência" />
              <q-tab name="education" icon="school" label="Formação" />
            </q-tabs>
          </q-card>

          <!-- Tab Panels -->
          <q-tab-panels v-model="activeTab" animated class="bg-transparent">
            <!-- Activity Tab -->
            <q-tab-panel name="activity" class="q-pa-none">
              <!-- Activity Stats -->
              <div class="activity-stats q-mb-lg">
                <q-card flat class="activity-stat-card">
                  <q-card-section class="text-center">
                    <q-icon name="local_fire_department" size="32px" color="orange" />
                    <div class="stat-value">127</div>
                    <div class="stat-label">Dias consecutivos</div>
                  </q-card-section>
                </q-card>
                <q-card flat class="activity-stat-card">
                  <q-card-section class="text-center">
                    <q-icon name="code" size="32px" color="primary" />
                    <div class="stat-value">2.4k</div>
                    <div class="stat-label">Commits este ano</div>
                  </q-card-section>
                </q-card>
                <q-card flat class="activity-stat-card">
                  <q-card-section class="text-center">
                    <q-icon name="bug_report" size="32px" color="positive" />
                    <div class="stat-value">89</div>
                    <div class="stat-label">Issues resolvidas</div>
                  </q-card-section>
                </q-card>
                <q-card flat class="activity-stat-card">
                  <q-card-section class="text-center">
                    <q-icon name="merge_type" size="32px" color="purple" />
                    <div class="stat-value">156</div>
                    <div class="stat-label">Pull Requests</div>
                  </q-card-section>
                </q-card>
              </div>

              <!-- Contribution Graph -->
              <q-card flat class="profile-card q-mb-lg">
                <q-card-section>
                  <div class="card-header">
                    <h3 class="card-title">
                      <q-icon name="insights" class="q-mr-sm" />
                      Contribuições
                    </h3>
                    <q-select
                      v-model="contributionYear"
                      :options="['2024', '2023', '2022']"
                      dense
                      outlined
                      class="year-select"
                    />
                  </div>

                  <div class="contribution-graph">
                    <div class="contribution-months">
                      <span v-for="month in months" :key="month">{{ month }}</span>
                    </div>
                    <div class="contribution-grid">
                      <div
                        v-for="(week, weekIdx) in contributionData"
                        :key="weekIdx"
                        class="contribution-week"
                      >
                        <div
                          v-for="(day, dayIdx) in week"
                          :key="dayIdx"
                          class="contribution-day"
                          :class="getContributionClass(day)"
                          :title="`${day} contribuições`"
                        ></div>
                      </div>
                    </div>
                    <div class="contribution-legend">
                      <span>Menos</span>
                      <div class="legend-squares">
                        <div class="contribution-day level-0"></div>
                        <div class="contribution-day level-1"></div>
                        <div class="contribution-day level-2"></div>
                        <div class="contribution-day level-3"></div>
                        <div class="contribution-day level-4"></div>
                      </div>
                      <span>Mais</span>
                    </div>
                  </div>
                </q-card-section>
              </q-card>

              <!-- Recent Activity -->
              <q-card flat class="profile-card">
                <q-card-section>
                  <div class="card-header">
                    <h3 class="card-title">
                      <q-icon name="history" class="q-mr-sm" />
                      Atividade Recente
                    </h3>
                    <q-btn flat color="primary" label="Ver todas" size="sm" />
                  </div>

                  <q-timeline color="primary" class="activity-timeline">
                    <q-timeline-entry
                      v-for="activity in recentActivities"
                      :key="activity.id"
                      :icon="activity.icon"
                      :color="activity.color"
                    >
                      <template #subtitle>
                        <span class="activity-time">{{ activity.time }}</span>
                      </template>
                      <template #title>
                        <span class="activity-title">{{ activity.title }}</span>
                      </template>
                      <div class="activity-description">
                        {{ activity.description }}
                        <q-chip
                          v-if="activity.tag"
                          :color="activity.tagColor"
                          text-color="white"
                          size="sm"
                          dense
                          class="q-ml-sm"
                        >
                          {{ activity.tag }}
                        </q-chip>
                      </div>
                    </q-timeline-entry>
                  </q-timeline>
                </q-card-section>
              </q-card>
            </q-tab-panel>

            <!-- Projects Tab -->
            <q-tab-panel name="projects" class="q-pa-none">
              <div class="projects-header q-mb-lg">
                <q-input
                  v-model="searchProjects"
                  outlined
                  dense
                  placeholder="Buscar projetos..."
                  class="search-input"
                >
                  <template #prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-btn-toggle
                  v-model="projectFilter"
                  unelevated
                  rounded
                  toggle-color="primary"
                  :options="[
                    { label: 'Todos', value: 'all' },
                    { label: 'Em Andamento', value: 'progress' },
                    { label: 'Concluídos', value: 'completed' },
                  ]"
                />
              </div>

              <div class="projects-grid">
                <q-card
                  v-for="project in filteredProjects"
                  :key="project.id"
                  flat
                  class="project-card"
                >
                  <div class="project-image" :style="{ background: project.gradient }">
                    <q-icon :name="project.icon" size="48px" color="white" />
                    <q-chip
                      :color="project.status === 'Concluído' ? 'positive' : 'warning'"
                      text-color="white"
                      size="sm"
                      class="project-status"
                    >
                      {{ project.status }}
                    </q-chip>
                  </div>

                  <q-card-section>
                    <h4 class="project-name">{{ project.name }}</h4>
                    <p class="project-description">{{ project.description }}</p>

                    <div class="project-tech">
                      <q-chip
                        v-for="tech in project.technologies"
                        :key="tech"
                        size="sm"
                        outline
                        dense
                      >
                        {{ tech }}
                      </q-chip>
                    </div>

                    <div class="project-meta">
                      <div class="meta-item">
                        <q-icon name="star" color="amber" size="16px" />
                        <span>{{ project.stars }}</span>
                      </div>
                      <div class="meta-item">
                        <q-icon name="call_split" size="16px" />
                        <span>{{ project.forks }}</span>
                      </div>
                      <div class="meta-item">
                        <q-icon name="visibility" size="16px" />
                        <span>{{ project.views }}</span>
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-actions>
                    <q-btn flat color="primary" icon="visibility" label="Ver" />
                    <q-space />
                    <q-btn flat round icon="favorite_border" />
                    <q-btn flat round icon="share" />
                  </q-card-actions>
                </q-card>
              </div>
            </q-tab-panel>

            <!-- Experience Tab -->
            <q-tab-panel name="experience" class="q-pa-none">
              <q-card flat class="profile-card">
                <q-card-section>
                  <div class="card-header">
                    <h3 class="card-title">
                      <q-icon name="work_history" class="q-mr-sm" />
                      Experiência Profissional
                    </h3>
                    <q-btn flat round dense icon="add" size="sm" />
                  </div>

                  <div class="experience-list">
                    <div v-for="exp in experiences" :key="exp.id" class="experience-item">
                      <div class="experience-logo">
                        <q-avatar size="56px" :color="exp.color" text-color="white">
                          <q-icon :name="exp.icon" size="28px" />
                        </q-avatar>
                      </div>

                      <div class="experience-content">
                        <div class="experience-header">
                          <div>
                            <h4 class="experience-title">{{ exp.title }}</h4>
                            <p class="experience-company">{{ exp.company }}</p>
                          </div>
                          <div class="experience-period">
                            <q-chip outline size="sm" :color="exp.current ? 'positive' : 'grey'">
                              {{ exp.period }}
                            </q-chip>
                          </div>
                        </div>

                        <div class="experience-location">
                          <q-icon name="location_on" size="14px" />
                          {{ exp.location }}
                          <span v-if="exp.remote" class="remote-badge">• Remoto</span>
                        </div>

                        <p class="experience-description">{{ exp.description }}</p>

                        <div class="experience-skills">
                          <q-chip
                            v-for="skill in exp.skills"
                            :key="skill"
                            size="sm"
                            color="primary"
                            text-color="white"
                            dense
                          >
                            {{ skill }}
                          </q-chip>
                        </div>

                        <div v-if="exp.achievements" class="experience-achievements">
                          <div class="achievement-title">
                            <q-icon name="emoji_events" size="16px" color="amber" />
                            Conquistas
                          </div>
                          <ul>
                            <li v-for="achievement in exp.achievements" :key="achievement">
                              {{ achievement }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-tab-panel>

            <!-- Education Tab -->
            <q-tab-panel name="education" class="q-pa-none">
              <q-card flat class="profile-card q-mb-lg">
                <q-card-section>
                  <div class="card-header">
                    <h3 class="card-title">
                      <q-icon name="school" class="q-mr-sm" />
                      Formação Acadêmica
                    </h3>
                    <q-btn flat round dense icon="add" size="sm" />
                  </div>

                  <div class="education-list">
                    <div v-for="edu in education" :key="edu.id" class="education-item">
                      <div class="education-logo">
                        <q-avatar size="56px" :color="edu.color" text-color="white">
                          <q-icon :name="edu.icon" size="28px" />
                        </q-avatar>
                      </div>

                      <div class="education-content">
                        <div class="education-header">
                          <div>
                            <h4 class="education-degree">{{ edu.degree }}</h4>
                            <p class="education-institution">{{ edu.institution }}</p>
                          </div>
                          <q-chip outline size="sm">{{ edu.period }}</q-chip>
                        </div>

                        <p class="education-description">{{ edu.description }}</p>

                        <div v-if="edu.highlights" class="education-highlights">
                          <q-chip
                            v-for="highlight in edu.highlights"
                            :key="highlight"
                            size="sm"
                            icon="star"
                            color="amber"
                            text-color="dark"
                            dense
                          >
                            {{ highlight }}
                          </q-chip>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>

              <!-- Certifications -->
              <q-card flat class="profile-card">
                <q-card-section>
                  <div class="card-header">
                    <h3 class="card-title">
                      <q-icon name="verified" class="q-mr-sm" />
                      Certificações
                    </h3>
                    <q-btn flat round dense icon="add" size="sm" />
                  </div>

                  <div class="certifications-grid">
                    <div v-for="cert in certifications" :key="cert.id" class="certification-card">
                      <div class="cert-icon" :style="{ background: cert.gradient }">
                        <q-icon :name="cert.icon" size="32px" color="white" />
                      </div>
                      <div class="cert-info">
                        <h4 class="cert-name">{{ cert.name }}</h4>
                        <p class="cert-issuer">{{ cert.issuer }}</p>
                        <p class="cert-date">
                          <q-icon name="event" size="14px" />
                          {{ cert.date }}
                        </p>
                      </div>
                      <q-btn flat round icon="open_in_new" size="sm" color="primary" />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

// Tab ativa
const activeTab = ref('activity')

// Dados do usuário
const skills = ref([
  { name: 'Vue.js / Quasar', level: 95, color: 'positive' },
  { name: 'Node.js', level: 90, color: 'primary' },
  { name: 'TypeScript', level: 85, color: 'info' },
  { name: 'PostgreSQL', level: 80, color: 'warning' },
  { name: 'Docker / K8s', level: 75, color: 'purple' },
  { name: 'AWS', level: 70, color: 'orange' },
])

const skillTags = ref([
  'REST API',
  'GraphQL',
  'Git',
  'CI/CD',
  'Scrum',
  'TDD',
  'Microservices',
  'Redis',
  'MongoDB',
  'RabbitMQ',
])

const languages = ref([
  { name: 'Português', level: 'Nativo', flag: '🇧🇷', stars: 5 },
  { name: 'Inglês', level: 'Fluente', flag: '🇺🇸', stars: 5 },
  { name: 'Espanhol', level: 'Intermediário', flag: '🇪🇸', stars: 3 },
])

// Atividades
const contributionYear = ref('2024')
const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

// Gerar dados de contribuição aleatórios
const contributionData = ref(
  Array.from({ length: 52 }, () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 15))),
)

const getContributionClass = (value) => {
  if (value === 0) return 'level-0'
  if (value <= 3) return 'level-1'
  if (value <= 6) return 'level-2'
  if (value <= 10) return 'level-3'
  return 'level-4'
}

const recentActivities = ref([
  {
    id: 1,
    icon: 'code',
    color: 'positive',
    title: 'Commit em sistema-gestao',
    description: 'feat: implementação do módulo de relatórios',
    time: 'Há 2 horas',
    tag: '+482 -127',
    tagColor: 'positive',
  },
  {
    id: 2,
    icon: 'merge_type',
    color: 'purple',
    title: 'Pull Request Aprovado',
    description: 'Refatoração do sistema de autenticação',
    time: 'Há 5 horas',
    tag: 'Merged',
    tagColor: 'purple',
  },
  {
    id: 3,
    icon: 'bug_report',
    color: 'negative',
    title: 'Issue Resolvida',
    description: 'Correção do bug de login em dispositivos móveis',
    time: 'Ontem',
    tag: 'Bug Fix',
    tagColor: 'negative',
  },
  {
    id: 4,
    icon: 'star',
    color: 'amber',
    title: 'Projeto Favoritado',
    description: 'quasar-admin-template recebeu uma estrela',
    time: 'Há 2 dias',
  },
  {
    id: 5,
    icon: 'person_add',
    color: 'info',
    title: 'Novo Seguidor',
    description: 'Maria Silva começou a seguir você',
    time: 'Há 3 dias',
  },
])

// Projetos
const searchProjects = ref('')
const projectFilter = ref('all')

const projects = ref([
  {
    id: 1,
    name: 'Quasar Admin Dashboard',
    description: 'Dashboard administrativo completo construído com Quasar Framework',
    icon: 'dashboard',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    status: 'Em Andamento',
    stars: 234,
    forks: 45,
    views: '1.2k',
    technologies: ['Vue 3', 'Quasar', 'Pinia', 'TypeScript'],
  },
  {
    id: 2,
    name: 'E-commerce API',
    description: 'API RESTful para plataforma de e-commerce com Node.js',
    icon: 'shopping_cart',
    gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
    status: 'Concluído',
    stars: 189,
    forks: 32,
    views: '890',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
  },
  {
    id: 3,
    name: 'Chat Real-time',
    description: 'Aplicação de chat em tempo real com Socket.io',
    icon: 'chat',
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    status: 'Concluído',
    stars: 156,
    forks: 28,
    views: '756',
    technologies: ['Vue.js', 'Socket.io', 'Node.js', 'MongoDB'],
  },
  {
    id: 4,
    name: 'Mobile Fitness App',
    description: 'Aplicativo de fitness para iOS e Android',
    icon: 'fitness_center',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    status: 'Em Andamento',
    stars: 98,
    forks: 12,
    views: '432',
    technologies: ['Quasar', 'Capacitor', 'Firebase'],
  },
  {
    id: 5,
    name: 'Task Manager',
    description: 'Gerenciador de tarefas estilo Kanban',
    icon: 'assignment',
    gradient: 'linear-gradient(135deg, #ec4899, #be185d)',
    status: 'Concluído',
    stars: 312,
    forks: 67,
    views: '2.1k',
    technologies: ['Vue 3', 'Vuex', 'Tailwind', 'Supabase'],
  },
  {
    id: 6,
    name: 'Weather Dashboard',
    description: 'Dashboard de previsão do tempo com gráficos interativos',
    icon: 'wb_sunny',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    status: 'Concluído',
    stars: 78,
    forks: 15,
    views: '345',
    technologies: ['Vue.js', 'Chart.js', 'OpenWeather API'],
  },
])

const filteredProjects = computed(() => {
  let result = projects.value

  if (searchProjects.value) {
    const search = searchProjects.value.toLowerCase()
    result = result.filter(
      (p) => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search),
    )
  }

  if (projectFilter.value === 'progress') {
    result = result.filter((p) => p.status === 'Em Andamento')
  } else if (projectFilter.value === 'completed') {
    result = result.filter((p) => p.status === 'Concluído')
  }

  return result
})

// Experiências
const experiences = ref([
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Brasil',
    period: 'Jan 2022 - Presente',
    location: 'São Paulo, SP',
    remote: true,
    current: true,
    color: 'primary',
    icon: 'business',
    description:
      'Liderança técnica de equipe de 8 desenvolvedores. Arquitetura e desenvolvimento de aplicações web escaláveis utilizando Vue.js, Node.js e AWS.',
    skills: ['Vue.js', 'Node.js', 'AWS', 'PostgreSQL', 'Docker'],
    achievements: [
      'Redução de 40% no tempo de carregamento da aplicação principal',
      'Implementação de CI/CD que reduziu deploys de 2h para 15min',
      'Mentoria de 5 desenvolvedores júnior',
    ],
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    period: 'Mar 2019 - Dez 2021',
    location: 'São Paulo, SP',
    remote: false,
    current: false,
    color: 'positive',
    icon: 'rocket_launch',
    description:
      'Desenvolvimento de plataforma SaaS do zero até 50k usuários ativos. Responsável pelo backend, frontend e infraestrutura.',
    skills: ['Vue.js', 'Express', 'MongoDB', 'Redis', 'Heroku'],
    achievements: [
      'Arquitetura que suportou crescimento de 10x em usuários',
      'Integração com mais de 20 APIs de terceiros',
    ],
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'Agência Digital ABC',
    period: 'Jun 2017 - Fev 2019',
    location: 'São Paulo, SP',
    remote: false,
    current: false,
    color: 'warning',
    icon: 'design_services',
    description:
      'Desenvolvimento de interfaces web responsivas e interativas para diversos clientes corporativos.',
    skills: ['Vue.js', 'JavaScript', 'SCSS', 'Webpack'],
  },
])

// Educação
const education = ref([
  {
    id: 1,
    degree: 'Mestrado em Ciência da Computação',
    institution: 'Universidade de São Paulo (USP)',
    period: '2019 - 2021',
    color: 'primary',
    icon: 'school',
    description: 'Foco em Engenharia de Software e Arquitetura de Sistemas Distribuídos.',
    highlights: ['Bolsista CAPES', 'Média 9.2'],
  },
  {
    id: 2,
    degree: 'Bacharelado em Sistemas de Informação',
    institution: 'Universidade Estadual de Campinas (UNICAMP)',
    period: '2014 - 2018',
    color: 'positive',
    icon: 'computer',
    description:
      'Formação completa em desenvolvimento de software, banco de dados e gestão de projetos.',
    highlights: ['Melhor TCC', 'Destaque Acadêmico'],
  },
])

// Certificações
const certifications = ref([
  {
    id: 1,
    name: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'Dez 2023',
    icon: 'cloud',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
  {
    id: 2,
    name: 'Vue.js Certified Developer',
    issuer: 'Vue School',
    date: 'Set 2023',
    icon: 'code',
    gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
  },
  {
    id: 3,
    name: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    date: 'Jun 2022',
    icon: 'groups',
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
  },
  {
    id: 4,
    name: 'Docker Certified Associate',
    issuer: 'Docker Inc.',
    date: 'Mar 2022',
    icon: 'inventory_2',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
  },
])
</script>

<style lang="scss">
// Variables
$card-radius: 16px;
$transition: all 0.3s ease;

// Page
.profile-page {
  background: #f8fafc;
  min-height: 100vh;

  .body--dark & {
    background: #0f172a;
  }
}

// Cover Section
.profile-cover {
  position: relative;
  padding-bottom: 2rem;
}

.cover-image {
  position: relative;
  height: 300px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cover-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  }
}

.cover-actions {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;

  .cover-btn {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
  }
}

.profile-header-content {
  position: relative;
  max-width: 1200px;
  margin: -100px auto 0;
  padding: 0 2rem;
  display: flex;
  gap: 2rem;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: -80px;
  }
}

.avatar-section {
  position: relative;
  flex-shrink: 0;
}

.profile-avatar {
  border: 4px solid white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

  .avatar-edit-btn {
    position: absolute;
    bottom: 8px;
    right: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
}

.profile-badges {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;

  .verified-badge,
  .pro-badge {
    padding: 4px 12px;
    font-size: 0.75rem;
    font-weight: 600;
  }
}

.profile-info {
  flex: 1;
  padding-top: 0.5rem;
  color: white;

  @media (max-width: 768px) {
    padding-top: 0;
  }
}

.profile-name-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
}

.profile-name {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.edit-profile-btn {
  border-radius: 8px;
}

.profile-role {
  font-size: 1.125rem;
  opacity: 0.9;
  margin: 0.25rem 0;
}

.profile-company {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  opacity: 0.8;
  margin: 0 0 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
}

.profile-meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    opacity: 0.8;

    a {
      color: white;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.profile-stats {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }

  .stat-item {
    text-align: center;

    .stat-value {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .stat-label {
      font-size: 0.75rem;
      opacity: 0.7;
    }
  }
}

// Content
.profile-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

// Cards
.profile-card {
  border-radius: $card-radius;
  border: 1px solid rgba(0, 0, 0, 0.05);

  .body--dark & {
    background: #1e293b;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-title {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;

  .body--dark & {
    color: #f1f5f9;
  }
}

// About
.about-text {
  color: #64748b;
  line-height: 1.7;
  margin: 0;
}

// Contact List
.contact-list {
  .q-item {
    padding: 0.75rem 0;
    border-radius: 8px;
  }
}

// Social Grid
.social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  text-decoration: none;
  transition: $transition;

  span {
    font-size: 0.8rem;
    font-weight: 500;
    margin-top: 0.5rem;
  }

  .social-username {
    font-size: 0.7rem;
    opacity: 0.7;
    margin-top: 0;
  }

  &.github {
    background: rgba(36, 41, 46, 0.1);
    color: #24292e;

    .body--dark & {
      background: rgba(255, 255, 255, 0.1);
      color: #f1f5f9;
    }

    &:hover {
      background: #24292e;
      color: white;
    }
  }

  &.linkedin {
    background: rgba(0, 119, 181, 0.1);
    color: #0077b5;

    &:hover {
      background: #0077b5;
      color: white;
    }
  }

  &.twitter {
    background: rgba(29, 161, 242, 0.1);
    color: #1da1f2;

    &:hover {
      background: #1da1f2;
      color: white;
    }
  }

  &.dribbble {
    background: rgba(234, 76, 137, 0.1);
    color: #ea4c89;

    &:hover {
      background: #ea4c89;
      color: white;
    }
  }
}

// Skills
.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  .skill-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .skill-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: #334155;

    .body--dark & {
      color: #e2e8f0;
    }
  }

  .skill-level {
    font-size: 0.75rem;
    color: #64748b;
  }
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

// Languages
.languages-list {
  .flag-icon {
    font-size: 1.5rem;
  }
}

// Tabs
.profile-tabs {
  .q-tab {
    text-transform: none;
    font-weight: 500;
  }
}

// Activity Stats
.activity-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.activity-stat-card {
  border-radius: $card-radius;
  border: 1px solid rgba(0, 0, 0, 0.05);

  .stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0.5rem 0 0.25rem;

    .body--dark & {
      color: #f1f5f9;
    }
  }

  .stat-label {
    font-size: 0.75rem;
    color: #64748b;
  }

  .body--dark & {
    background: #1e293b;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

// Contribution Graph
.contribution-graph {
  margin-top: 1rem;
}

.contribution-months {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: #64748b;
  margin-bottom: 0.5rem;
  padding: 0 4px;
}

.contribution-grid {
  display: flex;
  gap: 3px;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.contribution-week {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.contribution-day {
  width: 12px;
  height: 12px;
  border-radius: 2px;

  &.level-0 {
    background: #ebedf0;
    .body--dark & {
      background: #161b22;
    }
  }
  &.level-1 {
    background: #9be9a8;
    .body--dark & {
      background: #0e4429;
    }
  }
  &.level-2 {
    background: #40c463;
    .body--dark & {
      background: #006d32;
    }
  }
  &.level-3 {
    background: #30a14e;
    .body--dark & {
      background: #26a641;
    }
  }
  &.level-4 {
    background: #216e39;
    .body--dark & {
      background: #39d353;
    }
  }
}

.contribution-legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  font-size: 0.7rem;
  color: #64748b;
  margin-top: 0.5rem;

  .legend-squares {
    display: flex;
    gap: 2px;
  }
}

// Activity Timeline
.activity-timeline {
  .activity-time {
    font-size: 0.75rem;
    color: #94a3b8;
  }

  .activity-title {
    font-weight: 500;
    color: #1e293b;

    .body--dark & {
      color: #f1f5f9;
    }
  }

  .activity-description {
    font-size: 0.875rem;
    color: #64748b;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
}

// Projects
.projects-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  .search-input {
    width: 280px;

    .q-field__control {
      border-radius: 8px;
    }
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.project-card {
  border-radius: $card-radius;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: $transition;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  .body--dark & {
    background: #1e293b;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

.project-image {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .project-status {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}

.project-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem;

  .body--dark & {
    color: #f1f5f9;
  }
}

.project-description {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.project-meta {
  display: flex;
  gap: 1rem;

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.8rem;
    color: #64748b;
  }
}

// Experience
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.experience-item {
  display: flex;
  gap: 1.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.experience-logo {
  flex-shrink: 0;
}

.experience-content {
  flex: 1;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 600px) {
    justify-content: center;
  }
}

.experience-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;

  .body--dark & {
    color: #f1f5f9;
  }
}

.experience-company {
  color: var(--q-primary);
  margin: 0;
  font-weight: 500;
}

.experience-location {
  font-size: 0.875rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.75rem;

  .remote-badge {
    color: var(--q-positive);
    font-weight: 500;
  }

  @media (max-width: 600px) {
    justify-content: center;
  }
}

.experience-description {
  color: #475569;
  line-height: 1.6;
  margin: 0 0 1rem;

  .body--dark & {
    color: #94a3b8;
  }
}

.experience-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    justify-content: center;
  }
}

.experience-achievements {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;

  .achievement-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;

    .body--dark & {
      color: #f1f5f9;
    }
  }

  ul {
    margin: 0;
    padding-left: 1.25rem;
    color: #64748b;

    li {
      margin-bottom: 0.25rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .body--dark & {
    background: #0f172a;
  }
}

// Education
.education-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.education-item {
  display: flex;
  gap: 1.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.education-logo {
  flex-shrink: 0;
}

.education-content {
  flex: 1;
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;

  @media (max-width: 600px) {
    justify-content: center;
  }
}

.education-degree {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;

  .body--dark & {
    color: #f1f5f9;
  }
}

.education-institution {
  color: var(--q-primary);
  margin: 0;
  font-weight: 500;
}

.education-description {
  color: #64748b;
  margin: 0 0 1rem;
}

.education-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 600px) {
    justify-content: center;
  }
}

// Certifications
.certifications-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.certification-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  transition: $transition;

  &:hover {
    background: #f1f5f9;
  }

  .body--dark & {
    background: #0f172a;

    &:hover {
      background: #1e293b;
    }
  }
}

.cert-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cert-info {
  flex: 1;

  .cert-name {
    font-weight: 600;
    color: #1e293b;
    margin: 0;

    .body--dark & {
      color: #f1f5f9;
    }
  }

  .cert-issuer {
    font-size: 0.875rem;
    color: var(--q-primary);
    margin: 0.25rem 0;
  }

  .cert-date {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: #64748b;
    margin: 0;
  }
}

// Year Select
.year-select {
  width: 100px;

  .q-field__control {
    border-radius: 8px;
  }
}
</style>
