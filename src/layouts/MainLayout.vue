<template>
  <q-layout view="lHh LpR lff" class="main-layout">
    <!-- Header Premium -->
    <q-header class="app-header">
      <q-toolbar class="q-px-lg">
        <!-- Logo e toggle -->
        <div class="flex items-center gap-md">
          <q-btn flat dense round icon="menu" class="menu-btn" @click="toggleLeftDrawer" />

          <div class="flex items-center gap-sm logo-container">
            <svg
              viewBox="0 0 54 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="app-logo"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538ZM43.826 18.0518C43.881 18.6003 43.9091 19.1566 43.9091 19.7194C43.9091 28.8568 36.4973 36.2642 27.3546 36.2642C18.2117 36.2642 10.8 28.8568 10.8 19.7194C10.8 19.1615 10.8276 18.61 10.8816 18.0663L7.75383 17.4411C7.66775 18.1886 7.62354 18.9488 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 18.9439 47.0407 18.1789 46.9536 17.4267L43.826 18.0518ZM44.2613 9.54743L40.9084 10.2176C37.9134 5.95821 32.9593 3.1746 27.3546 3.1746C21.7442 3.1746 16.7856 5.96385 13.7915 10.2305L10.4399 9.56057C13.892 3.83178 20.1756 0 27.3546 0C34.5281 0 40.8075 3.82591 44.2613 9.54743Z"
                fill="currentColor"
              />
              <mask
                id="mask0"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="8"
                width="54"
                height="11"
              >
                <path
                  d="M27 18.3652C10.5114 19.1944 0 8.88892 0 8.88892C0 8.88892 16.5176 14.5866 27 14.5866C37.4824 14.5866 54 8.88892 54 8.88892C54 8.88892 43.4886 17.5361 27 18.3652Z"
                  fill="currentColor"
                />
              </mask>
              <g mask="url(#mask0)">
                <path
                  d="M-4.673e-05 8.88887L3.73084 -1.91434L-8.00806 17.0473L-4.673e-05 8.88887ZM27 18.3652L26.4253 6.95109L27 18.3652ZM54 8.88887L61.2673 17.7127L50.2691 -1.91434L54 8.88887Z"
                  fill="currentColor"
                />
              </g>
            </svg>
            <span class="app-title">STARTER</span>
          </div>
        </div>

        <q-space />

        <!-- Search Bar -->
        <div class="search-container gt-sm">
          <q-input
            v-model="searchQuery"
            dense
            outlined
            placeholder="Search..."
            class="search-input"
          >
            <template #prepend>
              <q-icon name="search" size="sm" />
            </template>
            <template #append>
              <kbd class="search-kbd">⌘K</kbd>
            </template>
          </q-input>
        </div>

        <q-space />

        <!-- Right Actions -->
        <div class="flex items-center gap-sm">
          <!-- Search mobile -->
          <q-btn flat round dense icon="search" class="lt-md action-btn" />

          <!-- Theme Toggle -->
          <q-btn flat round dense class="action-btn" @click="toggleDarkMode">
            <q-icon :name="isDark ? 'light_mode' : 'dark_mode'" />
            <q-tooltip>Toggle theme</q-tooltip>
          </q-btn>

          <!-- Notifications -->
          <q-btn flat round dense icon="notifications_none" class="action-btn">
            <q-badge color="negative" floating rounded>3</q-badge>
            <q-tooltip>Notifications</q-tooltip>

            <q-menu class="notification-menu" anchor="bottom right" self="top right">
              <q-list style="min-width: 320px">
                <q-item-label header class="text-weight-bold">
                  Notifications
                  <q-badge color="primary" class="q-ml-sm">3 new</q-badge>
                </q-item-label>

                <q-item v-for="notif in notifications" :key="notif.id" clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar :color="notif.color" text-color="white" size="40px">
                      <q-icon :name="notif.icon" size="20px" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium">{{ notif.title }}</q-item-label>
                    <q-item-label caption>{{ notif.time }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator />
                <q-item clickable v-ripple class="text-center text-primary">
                  <q-item-section>View all notifications</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <!-- Apps Grid -->
          <q-btn flat round dense icon="apps" class="action-btn">
            <q-tooltip>Apps</q-tooltip>
            <q-menu class="apps-menu" anchor="bottom right" self="top right">
              <div class="apps-grid q-pa-md">
                <div v-for="app in apps" :key="app.name" class="app-item" @click="() => {}">
                  <q-avatar :color="app.color" text-color="white" size="42px">
                    <q-icon :name="app.icon" size="22px" />
                  </q-avatar>
                  <span class="app-name">{{ app.name }}</span>
                </div>
              </div>
            </q-menu>
          </q-btn>

          <q-separator vertical inset class="q-mx-sm header-separator" />

          <!-- User Menu -->
          <q-btn flat round dense class="user-btn">
            <q-avatar size="36px">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>

            <q-menu class="user-menu" anchor="bottom right" self="top right">
              <q-list style="min-width: 200px">
                <q-item class="q-py-md">
                  <q-item-section avatar>
                    <q-avatar size="48px">
                      <img src="https://cdn.quasar.dev/img/avatar.png" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">John Doe</q-item-label>
                    <q-item-label caption>Administrator</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon name="person" />
                  </q-item-section>
                  <q-item-section>Profile</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon name="settings" />
                  </q-item-section>
                  <q-item-section>Settings</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon name="payment" />
                  </q-item-section>
                  <q-item-section>Billing</q-item-section>
                </q-item>

                <q-separator />

                <q-item clickable v-ripple class="text-negative">
                  <q-item-section avatar>
                    <q-icon name="logout" />
                  </q-item-section>
                  <q-item-section>Sign Out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Premium Sidebar -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="280"
      :breakpoint="1024"
      class="app-drawer"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-md">
          <!-- Menu Sections -->
          <div v-for="section in menuSections" :key="section.title" class="menu-section">
            <menu-div class="menu-section-title">{{ section.title }}</menu-div>

            <q-list class="menu-list">
              <template v-for="item in section.items" :key="item.title">
                <!-- Item with submenu -->
                <q-expansion-item
                  v-if="item.children"
                  :icon="item.icon"
                  :label="item.title"
                  :caption="item.caption"
                  header-class="menu-item"
                  expand-icon-class="expand-icon"
                >
                  <q-item
                    v-for="child in item.children"
                    :key="child.title"
                    clickable
                    v-ripple
                    :to="child.link"
                    class="menu-subitem"
                  >
                    <q-item-section avatar>
                      <q-icon name="fiber_manual_record" size="8px" class="subitem-dot" />
                    </q-item-section>
                    <q-item-section>{{ child.title }}</q-item-section>
                    <q-item-section side v-if="child.badge">
                      <q-badge :color="child.badgeColor || 'primary'" rounded>
                        {{ child.badge }}
                      </q-badge>
                    </q-item-section>
                  </q-item>
                </q-expansion-item>

                <!-- Simple item -->
                <q-item
                  v-else
                  clickable
                  v-ripple
                  :to="item.link"
                  class="menu-item"
                  :class="{ 'menu-item-active': isActive(item.link) }"
                >
                  <q-item-section avatar>
                    <q-icon :name="item.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ item.title }}</q-item-label>
                    <q-item-label caption v-if="item.caption">{{ item.caption }}</q-item-label>
                  </q-item-section>
                  <q-item-section side v-if="item.badge">
                    <q-badge :color="item.badgeColor || 'primary'" rounded>
                      {{ item.badge }}
                    </q-badge>
                  </q-item-section>
                  <q-item-section side v-if="item.tag">
                    <q-chip :color="item.tagColor || 'primary'" text-color="white" size="sm" dense>
                      {{ item.tag }}
                    </q-chip>
                  </q-item-section>
                </q-item>
              </template>
            </q-list>
          </div>
        </div>
      </q-scroll-area>

      <!-- Drawer Footer -->
      <!-- <div class="drawer-footer">
        <q-card flat class="upgrade-card">
          <q-card-section class="q-pa-md">
            <div class="flex items-center gap-sm q-mb-sm">
              <q-icon name="auto_awesome" color="amber" size="24px" />
              <span class="text-weight-bold">Go Premium</span>
            </div>
            <p class="text-caption text-grey-6 q-mb-md">
              Unlock all features and get unlimited access.
            </p>
            <q-btn color="primary" unelevated class="full-width" label="Upgrade Now" size="sm" />
          </q-card-section>
        </q-card>
      </div> -->
    </q-drawer>

    <!-- Page Container -->
    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'

const $q = useQuasar()
const route = useRoute()

const leftDrawerOpen = ref(false)
const searchQuery = ref('')
const isDark = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  $q.dark.set(isDark.value)
}

const isActive = (link) => {
  return route.path === link
}

const notifications = ref([
  {
    id: 1,
    title: 'New order received',
    time: '2 min ago',
    icon: 'shopping_cart',
    color: 'primary',
  },
  { id: 2, title: 'Server limit reached', time: '1 hour ago', icon: 'dns', color: 'warning' },
  { id: 3, title: 'User registered', time: '3 hours ago', icon: 'person_add', color: 'positive' },
])

const apps = ref([
  { name: 'Calendar', icon: 'event', color: 'primary' },
  { name: 'Messages', icon: 'chat', color: 'positive' },
  { name: 'Tasks', icon: 'task_alt', color: 'warning' },
  { name: 'Files', icon: 'folder', color: 'info' },
  { name: 'Photos', icon: 'photo_library', color: 'purple' },
  { name: 'Analytics', icon: 'analytics', color: 'negative' },
])

const menuSections = ref([
  {
    title: 'MAIN',
    items: [
      { title: 'Dashboard', icon: 'dashboard', link: '/' },
      { title: 'Componentes', icon: 'apps', link: '/componentes' },
      { title: 'Contratos', icon: 'edit', link: '/contratos' },
      {
        title: 'Analytics',
        icon: 'analytics',
        link: '/analytics',
        tag: 'NEW',
        tagColor: 'positive',
      },
      { title: 'E-commerce', icon: 'storefront', link: '/ecommerce', badge: '12' },
    ],
  },
  {
    title: 'UI COMPONENTS',
    items: [
      {
        title: 'Forms',
        icon: 'dynamic_form',
        children: [
          { title: 'Input', link: '/forms/input' },
          { title: 'Select', link: '/forms/select' },
          { title: 'Checkbox', link: '/forms/checkbox' },
          { title: 'Radio', link: '/forms/radio' },
          { title: 'File Upload', link: '/forms/upload', badge: 'NEW', badgeColor: 'positive' },
        ],
      },
      {
        title: 'Data',
        icon: 'table_chart',
        children: [
          { title: 'Table', link: '/data/table' },
          { title: 'DataTable', link: '/data/datatable' },
          { title: 'Tree', link: '/data/tree' },
        ],
      },
      {
        title: 'Panels',
        icon: 'web',
        children: [
          { title: 'Card', link: '/panels/card' },
          { title: 'Accordion', link: '/panels/accordion' },
          { title: 'Tabs', link: '/panels/tabs' },
        ],
      },
    ],
  },
  {
    title: 'PAGES',
    items: [
      {
        title: 'Authentication',
        icon: 'lock',
        children: [
          { title: 'Login', link: '/auth/login' },
          { title: 'Register', link: '/auth/register' },
          { title: 'Forgot Password', link: '/auth/forgot' },
        ],
      },
      { title: 'User Profile', icon: 'person', link: '/user/profile' },
      { title: 'Settings', icon: 'settings', link: '/settings' },
      { title: 'Pricing', icon: 'payments', link: '/pricing' },
      { title: 'Help Center', icon: 'help', link: '/help' },
    ],
  },
])
</script>

<style lang="scss">
// Variables
$header-height: 64px;
$drawer-width: 280px;
$border-radius: 10px;
$transition: all 0.2s ease;

// Header Styles
.app-header {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  color: #1e293b !important;

  .body--dark & {
    background: rgba(30, 41, 59, 0.95) !important;
    border-bottom-color: rgba(255, 255, 255, 0.05);
    color: #f1f5f9 !important;
  }
}

.logo-container {
  .app-logo {
    width: 32px;
    height: auto;
    color: var(--q-primary);
  }

  .app-title {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    background: linear-gradient(135deg, var(--q-primary), #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.menu-btn {
  color: #64748b;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  .body--dark & {
    color: #94a3b8;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  }
}

.search-container {
  width: 100%;
  max-width: 400px;
}

.search-input {
  .q-field__control {
    border-radius: 24px !important;
    background: #f1f5f9;

    .body--dark & {
      background: #334155;
    }

    &::before {
      border: none !important;
    }
  }

  .q-field__marginal {
    color: #94a3b8;
  }
}

.search-kbd {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 11px;
  color: #94a3b8;
  border: 1px solid rgba(0, 0, 0, 0.1);

  .body--dark & {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
  }
}

.action-btn {
  color: #64748b;

  &:hover {
    color: var(--q-primary);
    background: rgba(var(--q-primary-rgb), 0.1);
  }

  .body--dark & {
    color: #94a3b8;
  }
}

.header-separator {
  opacity: 0.2;
}

// Drawer Styles
.app-drawer {
  background: #ffffff !important;
  border-right: 1px solid rgba(0, 0, 0, 0.05) !important;

  .body--dark & {
    background: #1e293b !important;
    border-right-color: rgba(255, 255, 255, 0.05) !important;
  }
}

.menu-section {
  margin-bottom: 1.5rem;
}

.menu-section-title {
  font-size: 0.7rem;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 0.5px;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
}

.menu-list {
  .q-item {
    border-radius: $border-radius;
    margin: 2px 0;
    min-height: 44px;
    transition: $transition;

    .q-item__section--avatar {
      min-width: 40px;
    }

    .q-icon {
      color: #64748b;
      font-size: 1.25rem;
    }

    .q-item__label {
      font-weight: 500;
      color: #334155;
      font-size: 0.9rem;

      .body--dark & {
        color: #e2e8f0;
      }
    }

    .q-item__label--caption {
      font-weight: 400;
      color: #94a3b8;
    }
  }
}

.menu-item {
  &:hover {
    background: rgba(var(--q-primary-rgb), 0.08) !important;

    .q-icon {
      color: var(--q-primary);
    }
  }

  &.menu-item-active {
    background: rgba(var(--q-primary-rgb), 0.12) !important;

    .q-icon,
    .q-item__label {
      color: var(--q-primary) !important;
    }
  }
}

.menu-subitem {
  padding-left: 1rem !important;
  min-height: 40px !important;

  .subitem-dot {
    color: #cbd5e1;
  }

  &:hover,
  &.q-router-link--active {
    .subitem-dot {
      color: var(--q-primary);
    }
  }
}

.expand-icon {
  color: #94a3b8;
}

// Drawer Footer
.drawer-footer {
  padding: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);

  .body--dark & {
    border-top-color: rgba(255, 255, 255, 0.05);
  }
}

.upgrade-card {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: $border-radius;
  border: 1px solid rgba(0, 0, 0, 0.05);

  .body--dark & {
    background: linear-gradient(135deg, #334155 0%, #1e293b 100%);
    border-color: rgba(255, 255, 255, 0.05);
  }
}

// Menus
.notification-menu,
.user-menu,
.apps-menu {
  border-radius: $border-radius;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);

  .body--dark & {
    background: #1e293b;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 280px;
}

.app-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: $border-radius;
  cursor: pointer;
  transition: $transition;

  &:hover {
    background: rgba(0, 0, 0, 0.05);

    .body--dark & {
      background: rgba(255, 255, 255, 0.05);
    }
  }

  .app-name {
    font-size: 0.75rem;
    font-weight: 500;
    color: #64748b;
  }
}

// Page Container
.page-container {
  background: #f8fafc;

  .body--dark & {
    background: #0f172a;
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
