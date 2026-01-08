<template>
  <q-page class="dashboard-page q-pa-lg">
    <!-- Page Header -->
    <div class="page-header q-mb-lg">
      <div>
        <h1 class="page-title">Dashboard</h1>
        <p class="page-subtitle">Welcome back, John! Here's what's happening today.</p>
      </div>
      <div class="header-actions">
        <q-btn outline color="primary" icon="download" label="Export" class="action-btn" />
        <q-btn unelevated color="primary" icon="add" label="New Report" class="action-btn" />
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row q-col-gutter-lg q-mb-lg">
      <div class="col-12 col-sm-6 col-lg-3" v-for="stat in stats" :key="stat.title">
        <q-card class="stat-card" flat>
          <q-card-section class="flex items-center justify-between">
            <div>
              <p class="stat-label">{{ stat.title }}</p>
              <h2 class="stat-value">{{ stat.value }}</h2>
              <div class="stat-change" :class="stat.isPositive ? 'positive' : 'negative'">
                <q-icon :name="stat.isPositive ? 'trending_up' : 'trending_down'" size="16px" />
                <span>{{ stat.change }} from last month</span>
              </div>
            </div>
            <q-avatar :style="{ background: stat.bgColor }" size="56px" class="stat-icon">
              <q-icon :name="stat.icon" :color="stat.color" size="28px" />
            </q-avatar>
          </q-card-section>
          <div class="stat-progress">
            <q-linear-progress :value="stat.progress" :color="stat.color" size="4px" rounded />
          </div>
        </q-card>
      </div>
    </div>

    <!-- Main Content Row -->
    <div class="row q-col-gutter-lg q-mb-lg">
      <!-- Chart Card -->
      <div class="col-12 col-lg-8">
        <q-card class="content-card" flat>
          <q-card-section class="card-header">
            <div>
              <h3 class="card-title">Revenue Overview</h3>
              <p class="card-subtitle">Monthly revenue statistics</p>
            </div>
            <q-btn-toggle
              v-model="chartPeriod"
              unelevated
              rounded
              toggle-color="primary"
              :options="[
                { label: 'Week', value: 'week' },
                { label: 'Month', value: 'month' },
                { label: 'Year', value: 'year' },
              ]"
              class="period-toggle"
            />
          </q-card-section>
          <q-card-section>
            <div class="chart-container">
              <!-- Simulated Chart with bars -->
              <div class="chart-bars">
                <div v-for="(bar, index) in chartData" :key="index" class="chart-bar-wrapper">
                  <div class="chart-bar" :style="{ height: bar.value + '%' }">
                    <q-tooltip>{{ bar.label }}: ${{ bar.amount }}</q-tooltip>
                  </div>
                  <span class="chart-label">{{ bar.label }}</span>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Activity Feed -->
      <div class="col-12 col-lg-4">
        <q-card class="content-card" flat>
          <q-card-section class="card-header">
            <div>
              <h3 class="card-title">Recent Activity</h3>
              <p class="card-subtitle">Latest updates</p>
            </div>
            <q-btn flat round dense icon="more_vert" />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-timeline color="primary" class="activity-timeline">
              <q-timeline-entry
                v-for="activity in activities"
                :key="activity.id"
                :icon="activity.icon"
                :color="activity.color"
              >
                <template #subtitle>
                  <span class="activity-time">{{ activity.time }}</span>
                </template>
                <div class="activity-content">
                  <strong>{{ activity.user }}</strong> {{ activity.action }}
                </div>
              </q-timeline-entry>
            </q-timeline>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Data Table Section -->
    <div class="row q-col-gutter-lg q-mb-lg">
      <div class="col-12">
        <q-card class="content-card" flat>
          <q-card-section class="card-header">
            <div>
              <h3 class="card-title">Recent Orders</h3>
              <p class="card-subtitle">Manage and track your orders</p>
            </div>
            <div class="table-actions">
              <q-input
                v-model="tableSearch"
                dense
                outlined
                placeholder="Search orders..."
                class="search-field"
              >
                <template #prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-btn outline color="primary" icon="filter_list" label="Filter" />
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-table
              :rows="orders"
              :columns="orderColumns"
              row-key="id"
              flat
              class="premium-table"
              :pagination="{ rowsPerPage: 5 }"
            >
              <template #body-cell-customer="props">
                <q-td :props="props">
                  <div class="flex items-center gap-sm">
                    <q-avatar size="36px">
                      <img :src="props.row.avatar" />
                    </q-avatar>
                    <div>
                      <div class="customer-name">{{ props.row.customer }}</div>
                      <div class="customer-email">{{ props.row.email }}</div>
                    </div>
                  </div>
                </q-td>
              </template>
              <template #body-cell-status="props">
                <q-td :props="props">
                  <q-chip
                    :color="getStatusColor(props.row.status)"
                    text-color="white"
                    size="sm"
                    class="status-chip"
                  >
                    {{ props.row.status }}
                  </q-chip>
                </q-td>
              </template>
              <template #body-cell-actions="props">
                <q-td :props="props">
                  <q-btn flat round dense icon="visibility" size="sm" color="primary">
                    <q-tooltip>View</q-tooltip>
                  </q-btn>
                  <q-btn flat round dense icon="edit" size="sm" color="info">
                    <q-tooltip>Edit</q-tooltip>
                  </q-btn>
                  <q-btn flat round dense icon="delete" size="sm" color="negative">
                    <q-tooltip>Delete</q-tooltip>
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Forms & Components Row -->
    <div class="row q-col-gutter-lg q-mb-lg">
      <!-- Form Components -->
      <div class="col-12 col-lg-6">
        <q-card class="content-card" flat>
          <q-card-section class="card-header">
            <div>
              <h3 class="card-title">Form Components</h3>
              <p class="card-subtitle">Input elements showcase</p>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="form-grid">
              <q-input
                v-model="form.name"
                outlined
                label="Full Name"
                placeholder="Enter your name"
                class="form-field"
              >
                <template #prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                v-model="form.email"
                outlined
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                class="form-field"
              >
                <template #prepend>
                  <q-icon name="email" />
                </template>
              </q-input>

              <q-select
                v-model="form.country"
                outlined
                label="Country"
                :options="countries"
                class="form-field"
              >
                <template #prepend>
                  <q-icon name="public" />
                </template>
              </q-select>

              <q-input v-model="form.date" outlined label="Date" class="form-field">
                <template #prepend>
                  <q-icon name="event" />
                </template>
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.date" mask="YYYY-MM-DD" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input
                v-model="form.message"
                outlined
                label="Message"
                type="textarea"
                rows="3"
                class="form-field full-width"
              />

              <div class="form-field full-width">
                <label class="field-label">Skills</label>
                <q-slider
                  v-model="form.skills"
                  :min="0"
                  :max="100"
                  label
                  label-always
                  color="primary"
                  class="q-mt-lg"
                />
              </div>

              <div class="form-field">
                <label class="field-label">Notifications</label>
                <q-toggle
                  v-model="form.notifications"
                  color="primary"
                  label="Enable notifications"
                />
              </div>

              <div class="form-field">
                <label class="field-label">Priority</label>
                <q-option-group
                  v-model="form.priority"
                  :options="priorities"
                  color="primary"
                  inline
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions class="q-px-md q-pb-md">
            <q-space />
            <q-btn flat label="Cancel" color="grey" />
            <q-btn unelevated label="Save Changes" color="primary" />
          </q-card-actions>
        </q-card>
      </div>

      <!-- UI Components Showcase -->
      <div class="col-12 col-lg-6">
        <q-card class="content-card" flat>
          <q-card-section class="card-header">
            <div>
              <h3 class="card-title">UI Components</h3>
              <p class="card-subtitle">Buttons, chips & more</p>
            </div>
          </q-card-section>
          <q-card-section>
            <!-- Buttons Section -->
            <div class="component-section">
              <h4 class="section-label">Buttons</h4>
              <div class="button-group">
                <q-btn unelevated color="primary" label="Primary" />
                <q-btn unelevated color="secondary" label="Secondary" />
                <q-btn unelevated color="positive" label="Success" />
                <q-btn unelevated color="warning" label="Warning" />
                <q-btn unelevated color="negative" label="Danger" />
                <q-btn unelevated color="info" label="Info" />
              </div>
              <div class="button-group q-mt-md">
                <q-btn outline color="primary" label="Outlined" />
                <q-btn flat color="primary" label="Flat" />
                <q-btn round color="primary" icon="add" />
                <q-btn unelevated color="primary" icon="cloud_upload" label="Upload" />
                <q-btn unelevated color="primary" label="Loading" loading />
              </div>
            </div>

            <q-separator class="q-my-lg" />

            <!-- Chips Section -->
            <div class="component-section">
              <h4 class="section-label">Chips & Badges</h4>
              <div class="chips-group">
                <q-chip color="primary" text-color="white" icon="label">Primary</q-chip>
                <q-chip color="positive" text-color="white" icon="check_circle">Success</q-chip>
                <q-chip color="warning" text-color="white" icon="warning">Warning</q-chip>
                <q-chip color="negative" text-color="white" icon="error">Error</q-chip>
                <q-chip outline color="primary">Outlined</q-chip>
                <q-chip removable color="info" text-color="white">Removable</q-chip>
              </div>
            </div>

            <q-separator class="q-my-lg" />

            <!-- Progress Section -->
            <div class="component-section">
              <h4 class="section-label">Progress Indicators</h4>
              <div class="progress-items">
                <div class="progress-item">
                  <div class="progress-header">
                    <span>Project Alpha</span>
                    <span>75%</span>
                  </div>
                  <q-linear-progress :value="0.75" color="primary" rounded size="8px" />
                </div>
                <div class="progress-item">
                  <div class="progress-header">
                    <span>Project Beta</span>
                    <span>45%</span>
                  </div>
                  <q-linear-progress :value="0.45" color="positive" rounded size="8px" />
                </div>
                <div class="progress-item">
                  <div class="progress-header">
                    <span>Project Gamma</span>
                    <span>90%</span>
                  </div>
                  <q-linear-progress :value="0.9" color="warning" rounded size="8px" />
                </div>
              </div>
            </div>

            <q-separator class="q-my-lg" />

            <!-- Avatars Section -->
            <div class="component-section">
              <h4 class="section-label">Avatars</h4>
              <div class="avatar-group">
                <q-avatar size="48px">
                  <img src="https://cdn.quasar.dev/img/avatar1.jpg" />
                </q-avatar>
                <q-avatar size="48px">
                  <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                </q-avatar>
                <q-avatar size="48px">
                  <img src="https://cdn.quasar.dev/img/avatar3.jpg" />
                </q-avatar>
                <q-avatar size="48px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </q-avatar>
                <q-avatar size="48px" color="primary" text-color="white" icon="group_add" />
              </div>
            </div>

            <q-separator class="q-my-lg" />

            <!-- Rating Section -->
            <div class="component-section">
              <h4 class="section-label">Rating</h4>
              <q-rating
                v-model="rating"
                size="2em"
                color="amber"
                icon="star_border"
                icon-selected="star"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Tabs & Accordion Row -->
    <div class="row q-col-gutter-lg q-mb-lg">
      <!-- Tabs Card -->
      <div class="col-12 col-lg-6">
        <q-card class="content-card" flat>
          <q-card-section class="card-header">
            <div>
              <h3 class="card-title">Tabs Component</h3>
              <p class="card-subtitle">Content organization</p>
            </div>
          </q-card-section>
          <q-card-section>
            <q-tabs
              v-model="activeTab"
              class="premium-tabs"
              active-color="primary"
              indicator-color="primary"
              align="left"
            >
              <q-tab name="overview" icon="dashboard" label="Overview" />
              <q-tab name="analytics" icon="analytics" label="Analytics" />
              <q-tab name="reports" icon="description" label="Reports" />
              <q-tab name="settings" icon="settings" label="Settings" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="activeTab" animated class="tab-panels">
              <q-tab-panel name="overview">
                <div class="tab-content">
                  <h4>Overview</h4>
                  <p>
                    This is the overview panel content. Here you can see a summary of your dashboard
                    metrics and key performance indicators.
                  </p>
                  <div class="flex gap-md q-mt-md">
                    <q-btn unelevated color="primary" label="View Details" />
                    <q-btn outline color="primary" label="Download Report" />
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="analytics">
                <div class="tab-content">
                  <h4>Analytics</h4>
                  <p>
                    Detailed analytics and statistics about your application usage, user behavior,
                    and performance metrics.
                  </p>
                </div>
              </q-tab-panel>
              <q-tab-panel name="reports">
                <div class="tab-content">
                  <h4>Reports</h4>
                  <p>
                    Generate and download comprehensive reports for your business insights and
                    decision making.
                  </p>
                </div>
              </q-tab-panel>
              <q-tab-panel name="settings">
                <div class="tab-content">
                  <h4>Settings</h4>
                  <p>
                    Configure your preferences, notifications, and account settings to personalize
                    your experience.
                  </p>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
      </div>

      <!-- Accordion Card -->
      <div class="col-12 col-lg-6">
        <q-card class="content-card" flat>
          <q-card-section class="card-header">
            <div>
              <h3 class="card-title">Accordion</h3>
              <p class="card-subtitle">Expandable panels</p>
            </div>
          </q-card-section>
          <q-card-section>
            <q-list class="premium-accordion">
              <q-expansion-item
                v-for="(faq, index) in faqs"
                :key="index"
                :label="faq.question"
                :icon="faq.icon"
                header-class="accordion-header"
                expand-icon-class="accordion-icon"
                group="faqs"
              >
                <q-card flat>
                  <q-card-section class="accordion-content">
                    {{ faq.answer }}
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Bottom Cards Row -->
    <div class="row q-col-gutter-lg">
      <!-- Team Members -->
      <div class="col-12 col-md-6 col-lg-4">
        <q-card class="content-card" flat>
          <q-card-section class="card-header">
            <div>
              <h3 class="card-title">Team Members</h3>
              <p class="card-subtitle">Active collaborators</p>
            </div>
            <q-btn flat round dense icon="person_add" color="primary" />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-list class="team-list">
              <q-item
                v-for="member in teamMembers"
                :key="member.id"
                clickable
                v-ripple
                class="team-item"
              >
                <q-item-section avatar>
                  <q-avatar size="42px">
                    <img :src="member.avatar" />
                    <q-badge
                      floating
                      rounded
                      :color="member.online ? 'positive' : 'grey'"
                      class="status-badge"
                    />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="member-name">{{ member.name }}</q-item-label>
                  <q-item-label caption>{{ member.role }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn flat round dense icon="chat" size="sm" color="primary" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <!-- Notifications List -->
      <div class="col-12 col-md-6 col-lg-4">
        <q-card class="content-card" flat>
          <q-card-section class="card-header">
            <div>
              <h3 class="card-title">Notifications</h3>
              <p class="card-subtitle">Recent alerts</p>
            </div>
            <q-btn flat dense label="Mark all read" color="primary" size="sm" />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-list class="notification-list">
              <q-item
                v-for="notif in notificationList"
                :key="notif.id"
                clickable
                v-ripple
                class="notification-item"
              >
                <q-item-section avatar>
                  <q-avatar :color="notif.color" text-color="white" size="40px">
                    <q-icon :name="notif.icon" size="20px" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="notif-title">{{ notif.title }}</q-item-label>
                  <q-item-label caption>{{ notif.description }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ notif.time }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <!-- Quick Actions -->
      <div class="col-12 col-lg-4">
        <q-card class="content-card" flat>
          <q-card-section class="card-header">
            <div>
              <h3 class="card-title">Quick Actions</h3>
              <p class="card-subtitle">Shortcuts</p>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="quick-actions-grid">
              <div
                v-for="action in quickActions"
                :key="action.label"
                class="quick-action-item"
                @click="() => {}"
              >
                <q-avatar :style="{ background: action.bgColor }" size="48px">
                  <q-icon :name="action.icon" :style="{ color: action.iconColor }" size="24px" />
                </q-avatar>
                <span class="action-label">{{ action.label }}</span>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Calendar Mini -->
        <q-card class="content-card q-mt-lg" flat>
          <q-card-section class="card-header">
            <div>
              <h3 class="card-title">Calendar</h3>
              <p class="card-subtitle">{{ currentMonth }}</p>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-date v-model="selectedDate" minimal flat class="full-width premium-calendar" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

// Stats Data
const stats = ref([
  {
    title: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    isPositive: true,
    icon: 'attach_money',
    color: 'primary',
    bgColor: 'rgba(99, 102, 241, 0.1)',
    progress: 0.75,
  },
  {
    title: 'Total Orders',
    value: '2,345',
    change: '+15.3%',
    isPositive: true,
    icon: 'shopping_cart',
    color: 'positive',
    bgColor: 'rgba(34, 197, 94, 0.1)',
    progress: 0.6,
  },
  {
    title: 'Total Customers',
    value: '1,234',
    change: '+8.2%',
    isPositive: true,
    icon: 'people',
    color: 'info',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    progress: 0.45,
  },
  {
    title: 'Bounce Rate',
    value: '24.5%',
    change: '-4.3%',
    isPositive: false,
    icon: 'trending_down',
    color: 'warning',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    progress: 0.25,
  },
])

// Chart Data
const chartPeriod = ref('month')
const chartData = ref([
  { label: 'Jan', value: 65, amount: '12,500' },
  { label: 'Feb', value: 45, amount: '9,200' },
  { label: 'Mar', value: 75, amount: '15,800' },
  { label: 'Apr', value: 55, amount: '11,400' },
  { label: 'May', value: 85, amount: '18,200' },
  { label: 'Jun', value: 70, amount: '14,600' },
  { label: 'Jul', value: 90, amount: '19,800' },
  { label: 'Aug', value: 60, amount: '12,800' },
  { label: 'Sep', value: 80, amount: '17,200' },
  { label: 'Oct', value: 95, amount: '21,500' },
  { label: 'Nov', value: 75, amount: '16,200' },
  { label: 'Dec', value: 88, amount: '19,200' },
])

// Activities
const activities = ref([
  {
    id: 1,
    user: 'John Doe',
    action: 'created a new project',
    time: '2 min ago',
    icon: 'folder',
    color: 'primary',
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'uploaded 3 files',
    time: '15 min ago',
    icon: 'cloud_upload',
    color: 'positive',
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'commented on task',
    time: '1 hour ago',
    icon: 'chat',
    color: 'info',
  },
  {
    id: 4,
    user: 'Sarah Wilson',
    action: 'completed milestone',
    time: '3 hours ago',
    icon: 'check_circle',
    color: 'warning',
  },
])

// Table Data
const tableSearch = ref('')
const orderColumns = [
  { name: 'id', label: 'Order ID', field: 'id', align: 'left', sortable: true },
  { name: 'customer', label: 'Customer', field: 'customer', align: 'left', sortable: true },
  { name: 'product', label: 'Product', field: 'product', align: 'left' },
  { name: 'amount', label: 'Amount', field: 'amount', align: 'left', sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'center' },
  { name: 'date', label: 'Date', field: 'date', align: 'left', sortable: true },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' },
]

const orders = ref([
  {
    id: '#ORD-001',
    customer: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    product: 'MacBook Pro',
    amount: '$2,499',
    status: 'Completed',
    date: '2024-01-15',
  },
  {
    id: '#ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    product: 'iPhone 15',
    amount: '$1,199',
    status: 'Pending',
    date: '2024-01-14',
  },
  {
    id: '#ORD-003',
    customer: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
    product: 'AirPods Pro',
    amount: '$249',
    status: 'Processing',
    date: '2024-01-13',
  },
  {
    id: '#ORD-004',
    customer: 'Sarah Wilson',
    email: 'sarah@example.com',
    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
    product: 'iPad Air',
    amount: '$799',
    status: 'Completed',
    date: '2024-01-12',
  },
  {
    id: '#ORD-005',
    customer: 'Tom Brown',
    email: 'tom@example.com',
    avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
    product: 'Apple Watch',
    amount: '$399',
    status: 'Cancelled',
    date: '2024-01-11',
  },
])

const getStatusColor = (status) => {
  const colors = {
    Completed: 'positive',
    Pending: 'warning',
    Processing: 'info',
    Cancelled: 'negative',
  }
  return colors[status] || 'grey'
}

// Form Data
const form = ref({
  name: '',
  email: '',
  country: null,
  date: '',
  message: '',
  skills: 50,
  notifications: true,
  priority: 'medium',
})

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Brazil',
  'Japan',
  'Australia',
]
const priorities = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
]

// UI Components
const rating = ref(4)

// Tabs
const activeTab = ref('overview')

// Accordion
const faqs = ref([
  {
    question: 'How do I get started?',
    answer:
      "Getting started is easy! Simply create an account, complete your profile, and you're ready to explore all features of our platform.",
    icon: 'help',
  },
  {
    question: 'What payment methods are accepted?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.',
    icon: 'payment',
  },
  {
    question: 'Can I cancel my subscription?',
    answer:
      'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.',
    icon: 'cancel',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'Yes! We offer a 14-day free trial with full access to all premium features. No credit card required.',
    icon: 'card_giftcard',
  },
])

// Team Members
const teamMembers = ref([
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Product Manager',
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    online: true,
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'Developer',
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    online: true,
  },
  {
    id: 3,
    name: 'Carol White',
    role: 'Designer',
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
    online: false,
  },
  {
    id: 4,
    name: 'David Lee',
    role: 'Marketing',
    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
    online: true,
  },
])

// Notifications
const notificationList = ref([
  {
    id: 1,
    title: 'New Order',
    description: 'You have received a new order',
    time: '5m',
    icon: 'shopping_cart',
    color: 'primary',
  },
  {
    id: 2,
    title: 'Server Alert',
    description: 'CPU usage exceeded 90%',
    time: '1h',
    icon: 'warning',
    color: 'warning',
  },
  {
    id: 3,
    title: 'Payment Success',
    description: 'Invoice #1234 paid',
    time: '2h',
    icon: 'check_circle',
    color: 'positive',
  },
  {
    id: 4,
    title: 'New Message',
    description: 'John sent you a message',
    time: '3h',
    icon: 'chat',
    color: 'info',
  },
])

// Quick Actions
const quickActions = ref([
  {
    label: 'New Project',
    icon: 'add_circle',
    bgColor: 'rgba(99, 102, 241, 0.1)',
    iconColor: '#6366f1',
  },
  {
    label: 'Upload',
    icon: 'cloud_upload',
    bgColor: 'rgba(34, 197, 94, 0.1)',
    iconColor: '#22c55e',
  },
  {
    label: 'Reports',
    icon: 'assessment',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    iconColor: '#f59e0b',
  },
  { label: 'Settings', icon: 'settings', bgColor: 'rgba(59, 130, 246, 0.1)', iconColor: '#3b82f6' },
  { label: 'Users', icon: 'people', bgColor: 'rgba(168, 85, 247, 0.1)', iconColor: '#a855f7' },
  {
    label: 'Support',
    icon: 'support_agent',
    bgColor: 'rgba(236, 72, 153, 0.1)',
    iconColor: '#ec4899',
  },
])

// Calendar
const selectedDate = ref(new Date().toISOString().split('T')[0])
const currentMonth = computed(() => {
  return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})
</script>

<style lang="scss">
// Variables
$card-radius: 12px;
$transition: all 0.2s ease;

// Page Styles
.dashboard-page {
  background: #f8fafc;
  min-height: 100vh;

  .body--dark & {
    background: #0f172a;
  }
}

// Page Header
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;

  .body--dark & {
    color: #f1f5f9;
  }
}

.page-subtitle {
  color: #64748b;
  margin: 0.25rem 0 0;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  border-radius: 8px;
}

// Stat Cards
.stat-card {
  border-radius: $card-radius;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: $transition;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  }

  .body--dark & {
    background: #1e293b;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 0.25rem;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem;

  .body--dark & {
    color: #f1f5f9;
  }
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  font-weight: 500;

  &.positive {
    color: #22c55e;
  }

  &.negative {
    color: #ef4444;
  }
}

.stat-icon {
  border-radius: 12px;
}

.stat-progress {
  padding: 0;
}

// Content Cards
.content-card {
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
  flex-wrap: wrap;
  gap: 1rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;

  .body--dark & {
    color: #f1f5f9;
  }
}

.card-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0.25rem 0 0;
}

// Chart Styles
.chart-container {
  height: 280px;
  padding: 1rem 0;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
  gap: 8px;
}

.chart-bar-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.chart-bar {
  width: 100%;
  max-width: 40px;
  background: linear-gradient(180deg, var(--q-primary) 0%, rgba(99, 102, 241, 0.6) 100%);
  border-radius: 6px 6px 0 0;
  transition: $transition;
  cursor: pointer;
  margin-top: auto;

  &:hover {
    opacity: 0.8;
  }
}

.chart-label {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.5rem;
}

// Period Toggle
.period-toggle {
  border-radius: 8px;
  background: #f1f5f9;

  .body--dark & {
    background: #334155;
  }

  .q-btn {
    border-radius: 6px;
    text-transform: none;
    font-weight: 500;
  }
}

// Activity Timeline
.activity-timeline {
  .q-timeline__subtitle {
    opacity: 1;
  }
}

.activity-time {
  font-size: 0.75rem;
  color: #94a3b8;
}

.activity-content {
  font-size: 0.875rem;
  color: #475569;

  .body--dark & {
    color: #cbd5e1;
  }
}

// Table Styles
.table-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.search-field {
  width: 250px;

  .q-field__control {
    border-radius: 8px;
  }
}

.premium-table {
  .q-table__top,
  .q-table__bottom {
    border: none;
  }

  thead th {
    font-weight: 600;
    color: #64748b;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  tbody td {
    font-size: 0.9rem;
  }
}

.customer-name {
  font-weight: 500;
  color: #1e293b;

  .body--dark & {
    color: #f1f5f9;
  }
}

.customer-email {
  font-size: 0.8rem;
  color: #64748b;
}

.status-chip {
  font-weight: 500;
  font-size: 0.75rem;
}

// Form Styles
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.form-field {
  &.full-width {
    grid-column: span 2;

    @media (max-width: 600px) {
      grid-column: span 1;
    }
  }

  .q-field__control {
    border-radius: 8px;
  }
}

.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
  margin-bottom: 0.5rem;

  .body--dark & {
    color: #cbd5e1;
  }
}

// Component Sections
.component-section {
  margin-bottom: 0;
}

.section-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  margin: 0 0 1rem;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .q-btn {
    border-radius: 8px;
  }
}

.chips-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

// Progress Items
.progress-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.progress-item {
  .progress-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    color: #475569;

    .body--dark & {
      color: #cbd5e1;
    }
  }
}

// Avatar Group
.avatar-group {
  display: flex;
  gap: 0.5rem;

  .q-avatar {
    border: 2px solid white;
    margin-left: -8px;

    &:first-child {
      margin-left: 0;
    }

    .body--dark & {
      border-color: #1e293b;
    }
  }
}

// Tabs
.premium-tabs {
  .q-tab {
    text-transform: none;
    font-weight: 500;
  }
}

.tab-panels {
  min-height: 150px;
}

.tab-content {
  h4 {
    margin: 0 0 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;

    .body--dark & {
      color: #f1f5f9;
    }
  }

  p {
    color: #64748b;
    line-height: 1.6;
  }
}

// Accordion
.premium-accordion {
  .q-expansion-item {
    margin-bottom: 0.5rem;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.05);

    .body--dark & {
      border-color: rgba(255, 255, 255, 0.05);
    }
  }
}

.accordion-header {
  font-weight: 500;
}

.accordion-content {
  color: #64748b;
  line-height: 1.6;
}

// Team List
.team-list {
  .team-item {
    border-radius: 8px;
    margin-bottom: 0.25rem;
  }
}

.member-name {
  font-weight: 500;
}

.status-badge {
  width: 10px !important;
  height: 10px !important;
  min-height: 10px !important;
  border: 2px solid white;

  .body--dark & {
    border-color: #1e293b;
  }
}

// Notification List
.notification-list {
  .notification-item {
    border-radius: 8px;
    margin-bottom: 0.25rem;
  }
}

.notif-title {
  font-weight: 500;
}

// Quick Actions
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.quick-action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: $transition;

  &:hover {
    background: rgba(0, 0, 0, 0.03);

    .body--dark & {
      background: rgba(255, 255, 255, 0.05);
    }
  }

  .q-avatar {
    border-radius: 12px;
  }
}

.action-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
  text-align: center;
}

// Calendar
.premium-calendar {
  border-radius: 8px;

  .q-date__header {
    display: none;
  }
}

// Utilities
.gap-sm {
  gap: 0.5rem;
}

.gap-md {
  gap: 1rem;
}
</style>
