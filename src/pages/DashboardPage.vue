<template>
  <q-page class="showcase-page">
    <!-- Hero Section com Parallax -->
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <q-chip color="primary" text-color="white" icon="auto_awesome" class="hero-chip">
          Built with Quasar Framework
        </q-chip>
        <h1 class="hero-title">
          One Framework,<br />
          <span class="gradient-text">Endless Possibilities</span>
        </h1>
        <p class="hero-subtitle">
          Build high-performance Vue.js applications for Web, Mobile, and Desktop with a single
          codebase. Faster development, consistent design, superior DX.
        </p>
        <div class="hero-actions">
          <q-btn
            unelevated
            color="white"
            text-color="primary"
            label="Get Started"
            icon="rocket_launch"
            size="lg"
            class="hero-btn"
          />
          <q-btn
            outline
            color="white"
            label="View Components"
            icon="widgets"
            size="lg"
            class="hero-btn"
          />
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="stat-number">70+</span>
            <span class="stat-label">Components</span>
          </div>
          <div class="hero-stat">
            <span class="stat-number">5</span>
            <span class="stat-label">Platforms</span>
          </div>
          <div class="hero-stat">
            <span class="stat-number">24k+</span>
            <span class="stat-label">GitHub Stars</span>
          </div>
          <div class="hero-stat">
            <span class="stat-number">100%</span>
            <span class="stat-label">Tree-shakable</span>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <q-icon name="keyboard_arrow_down" size="32px" class="bounce" />
      </div>
    </section>

    <!-- Platform Cards -->
    <section class="section platforms-section">
      <div class="section-header">
        <q-chip outline color="primary" size="sm">MULTI-PLATFORM</q-chip>
        <h2 class="section-title">Build Once, Deploy Everywhere</h2>
        <p class="section-subtitle">Target multiple platforms with the same codebase</p>
      </div>

      <div class="platforms-grid">
        <q-card v-for="platform in platforms" :key="platform.name" class="platform-card" flat>
          <q-card-section class="text-center">
            <div class="platform-icon" :style="{ background: platform.gradient }">
              <q-icon :name="platform.icon" size="32px" color="white" />
            </div>
            <h3 class="platform-name">{{ platform.name }}</h3>
            <p class="platform-desc">{{ platform.description }}</p>
            <div class="platform-techs">
              <q-badge
                v-for="tech in platform.techs"
                :key="tech"
                outline
                color="grey-6"
                class="tech-badge"
              >
                {{ tech }}
              </q-badge>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </section>

    <!-- Interactive Components Showcase -->
    <section class="section components-section">
      <div class="section-header">
        <q-chip outline color="primary" size="sm">COMPONENTS</q-chip>
        <h2 class="section-title">Rich Component Library</h2>
        <p class="section-subtitle">Everything you need to build modern applications</p>
      </div>

      <div class="row q-col-gutter-lg">
        <!-- Interactive Cards Carousel -->
        <div class="col-12">
          <q-card class="showcase-card glass-card" flat>
            <q-card-section>
              <div class="flex items-center justify-between q-mb-lg">
                <div>
                  <h3 class="card-title">Featured Products</h3>
                  <p class="card-subtitle">Drag or swipe to explore</p>
                </div>
                <div class="carousel-nav">
                  <q-btn round flat icon="chevron_left" @click="$refs.carousel.previous()" />
                  <q-btn round flat icon="chevron_right" @click="$refs.carousel.next()" />
                </div>
              </div>

              <q-carousel
                ref="carousel"
                v-model="carouselSlide"
                transition-prev="slide-right"
                transition-next="slide-left"
                swipeable
                animated
                padding
                height="320px"
                class="product-carousel"
              >
                <q-carousel-slide
                  v-for="product in products"
                  :key="product.id"
                  :name="product.id"
                  class="no-padding"
                >
                  <div class="row q-col-gutter-md fit">
                    <div class="col-12 col-md-6">
                      <div class="product-image" :style="{ background: product.gradient }">
                        <q-icon :name="product.icon" size="80px" color="white" />
                        <q-badge v-if="product.badge" color="negative" floating>
                          {{ product.badge }}
                        </q-badge>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 flex column justify-center">
                      <q-chip :color="product.category.color" text-color="white" size="sm">
                        {{ product.category.name }}
                      </q-chip>
                      <h4 class="product-name q-mt-sm">{{ product.name }}</h4>
                      <p class="product-desc">{{ product.description }}</p>
                      <div class="product-rating q-mb-md">
                        <q-rating
                          :model-value="product.rating"
                          readonly
                          color="amber"
                          icon="star"
                          size="1.2em"
                        />
                        <span class="rating-count">({{ product.reviews }} reviews)</span>
                      </div>
                      <div class="product-price">
                        <span class="price-current">${{ product.price }}</span>
                        <span v-if="product.oldPrice" class="price-old"
                          >${{ product.oldPrice }}</span
                        >
                      </div>
                      <div class="product-actions q-mt-md">
                        <q-btn
                          unelevated
                          color="primary"
                          icon="shopping_cart"
                          label="Add to Cart"
                        />
                        <q-btn flat round icon="favorite_border" color="negative" />
                      </div>
                    </div>
                  </div>
                </q-carousel-slide>
              </q-carousel>
            </q-card-section>
          </q-card>
        </div>

        <!-- Kanban Board Style -->
        <div class="col-12">
          <q-card class="showcase-card" flat>
            <q-card-section>
              <div class="flex items-center justify-between q-mb-lg">
                <div>
                  <h3 class="card-title">Project Board</h3>
                  <p class="card-subtitle">Drag and drop task management</p>
                </div>
                <q-btn unelevated color="primary" icon="add" label="New Task" size="sm" />
              </div>

              <div class="kanban-board">
                <div v-for="column in kanbanColumns" :key="column.id" class="kanban-column">
                  <div class="kanban-header">
                    <div class="flex items-center gap-sm">
                      <div class="kanban-dot" :style="{ background: column.color }"></div>
                      <span class="kanban-title">{{ column.title }}</span>
                      <q-badge :label="column.tasks.length" color="grey-4" text-color="grey-8" />
                    </div>
                    <q-btn flat round dense icon="more_horiz" size="sm" />
                  </div>

                  <div class="kanban-tasks">
                    <q-card v-for="task in column.tasks" :key="task.id" class="kanban-task" flat>
                      <q-card-section class="q-pa-sm">
                        <div class="flex items-center justify-between q-mb-xs">
                          <q-chip :color="task.priority.color" text-color="white" size="xs" dense>
                            {{ task.priority.label }}
                          </q-chip>
                          <span class="task-id">{{ task.id }}</span>
                        </div>
                        <p class="task-title">{{ task.title }}</p>
                        <div class="task-footer">
                          <div class="task-assignees">
                            <q-avatar
                              v-for="(assignee, idx) in task.assignees"
                              :key="idx"
                              size="24px"
                              class="assignee-avatar"
                            >
                              <img :src="assignee" />
                            </q-avatar>
                          </div>
                          <div class="task-meta">
                            <q-icon name="chat_bubble_outline" size="14px" />
                            <span>{{ task.comments }}</span>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Chat Interface -->
        <div class="col-12 col-lg-6">
          <q-card class="showcase-card chat-card" flat>
            <q-card-section class="chat-header">
              <div class="flex items-center gap-md">
                <q-avatar size="48px">
                  <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                  <q-badge floating color="positive" rounded class="status-dot" />
                </q-avatar>
                <div>
                  <h3 class="chat-name">Sarah Wilson</h3>
                  <span class="chat-status">Online</span>
                </div>
              </div>
              <div class="chat-actions">
                <q-btn flat round icon="videocam" />
                <q-btn flat round icon="call" />
                <q-btn flat round icon="more_vert" />
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="chat-messages">
              <div
                v-for="msg in chatMessages"
                :key="msg.id"
                class="chat-message"
                :class="{ own: msg.own }"
              >
                <q-avatar v-if="!msg.own" size="32px" class="msg-avatar">
                  <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                </q-avatar>
                <div class="msg-content">
                  <div class="msg-bubble">{{ msg.text }}</div>
                  <span class="msg-time">{{ msg.time }}</span>
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="chat-input">
              <q-btn flat round icon="attach_file" color="grey" />
              <q-input
                v-model="chatInput"
                placeholder="Type a message..."
                dense
                borderless
                class="flex-grow"
              />
              <q-btn flat round icon="mood" color="grey" />
              <q-btn round unelevated color="primary" icon="send" />
            </q-card-section>
          </q-card>
        </div>

        <!-- Music Player -->
        <div class="col-12 col-lg-6">
          <q-card class="showcase-card music-card" flat>
            <div class="music-bg" :style="{ background: currentTrack.gradient }"></div>
            <q-card-section class="music-content">
              <div class="album-art">
                <q-icon :name="currentTrack.icon" size="64px" color="white" />
                <div class="vinyl-effect"></div>
              </div>

              <div class="track-info">
                <h3 class="track-name">{{ currentTrack.name }}</h3>
                <p class="track-artist">{{ currentTrack.artist }}</p>
              </div>

              <div class="music-progress">
                <span class="time-current">{{ currentTime }}</span>
                <q-slider
                  v-model="musicProgress"
                  :min="0"
                  :max="100"
                  color="white"
                  thumb-color="white"
                  track-color="white-4"
                  class="progress-slider"
                />
                <span class="time-total">{{ currentTrack.duration }}</span>
              </div>

              <div class="music-controls">
                <q-btn flat round icon="shuffle" color="white-7" />
                <q-btn flat round icon="skip_previous" color="white" size="lg" />
                <q-btn
                  unelevated
                  round
                  :icon="isPlaying ? 'pause' : 'play_arrow'"
                  color="white"
                  text-color="primary"
                  size="xl"
                  @click="isPlaying = !isPlaying"
                />
                <q-btn flat round icon="skip_next" color="white" size="lg" />
                <q-btn flat round icon="repeat" color="white-7" />
              </div>

              <div class="music-extra">
                <q-btn flat round icon="favorite_border" color="white-7" />
                <div class="volume-control">
                  <q-icon name="volume_up" color="white-7" />
                  <q-slider
                    v-model="volume"
                    :min="0"
                    :max="100"
                    color="white"
                    thumb-color="white"
                    track-color="white-4"
                    class="volume-slider"
                  />
                </div>
                <q-btn flat round icon="queue_music" color="white-7" />
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Data Visualization -->
        <div class="col-12 col-lg-8">
          <q-card class="showcase-card" flat>
            <q-card-section>
              <div class="flex items-center justify-between q-mb-lg">
                <div>
                  <h3 class="card-title">Analytics Overview</h3>
                  <p class="card-subtitle">Real-time performance metrics</p>
                </div>
                <q-tabs v-model="analyticsTab" dense class="analytics-tabs">
                  <q-tab name="traffic" label="Traffic" />
                  <q-tab name="sales" label="Sales" />
                  <q-tab name="users" label="Users" />
                </q-tabs>
              </div>

              <!-- Animated Area Chart -->
              <div class="chart-area">
                <svg viewBox="0 0 400 150" class="area-chart">
                  <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color: var(--q-primary); stop-opacity: 0.3" />
                      <stop offset="100%" style="stop-color: var(--q-primary); stop-opacity: 0" />
                    </linearGradient>
                  </defs>
                  <path :d="areaPath" fill="url(#areaGradient)" class="area-fill" />
                  <path
                    :d="linePath"
                    fill="none"
                    stroke="var(--q-primary)"
                    stroke-width="2"
                    class="area-line"
                  />
                  <circle
                    v-for="(point, idx) in chartPoints"
                    :key="idx"
                    :cx="point.x"
                    :cy="point.y"
                    r="4"
                    fill="var(--q-primary)"
                    class="chart-dot"
                  />
                </svg>
              </div>

              <!-- Mini Stats -->
              <div class="mini-stats">
                <div v-for="stat in miniStats" :key="stat.label" class="mini-stat">
                  <div class="mini-stat-icon" :style="{ background: stat.bgColor }">
                    <q-icon :name="stat.icon" :color="stat.color" />
                  </div>
                  <div class="mini-stat-info">
                    <span class="mini-stat-value">{{ stat.value }}</span>
                    <span class="mini-stat-label">{{ stat.label }}</span>
                  </div>
                  <q-chip
                    :color="stat.trend > 0 ? 'positive' : 'negative'"
                    text-color="white"
                    size="sm"
                    dense
                  >
                    {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
                  </q-chip>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Weather Widget -->
        <div class="col-12 col-lg-4">
          <q-card class="showcase-card weather-card" flat>
            <div class="weather-bg"></div>
            <q-card-section class="weather-content">
              <div class="weather-location">
                <q-icon name="location_on" size="16px" />
                <span>São Paulo, Brazil</span>
              </div>

              <div class="weather-main">
                <div class="weather-icon">
                  <q-icon name="wb_sunny" size="64px" color="amber" />
                </div>
                <div class="weather-temp">
                  <span class="temp-value">28°</span>
                  <span class="temp-unit">C</span>
                </div>
              </div>

              <p class="weather-desc">Sunny with light breeze</p>

              <div class="weather-details">
                <div class="weather-detail">
                  <q-icon name="water_drop" color="info" />
                  <span>65%</span>
                  <span class="detail-label">Humidity</span>
                </div>
                <div class="weather-detail">
                  <q-icon name="air" color="grey" />
                  <span>12 km/h</span>
                  <span class="detail-label">Wind</span>
                </div>
                <div class="weather-detail">
                  <q-icon name="visibility" color="warning" />
                  <span>10 km</span>
                  <span class="detail-label">Visibility</span>
                </div>
              </div>

              <q-separator class="q-my-md" dark />

              <div class="weather-forecast">
                <div v-for="day in forecast" :key="day.day" class="forecast-day">
                  <span class="forecast-name">{{ day.day }}</span>
                  <q-icon :name="day.icon" :color="day.color" size="24px" />
                  <span class="forecast-temp">{{ day.temp }}°</span>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- File Manager -->
        <div class="col-12">
          <q-card class="showcase-card" flat>
            <q-card-section>
              <div class="flex items-center justify-between q-mb-lg">
                <div>
                  <h3 class="card-title">File Manager</h3>
                  <p class="card-subtitle">Manage your files and folders</p>
                </div>
                <div class="file-actions">
                  <q-btn outline color="primary" icon="create_new_folder" label="New Folder" />
                  <q-btn unelevated color="primary" icon="upload_file" label="Upload" />
                </div>
              </div>

              <!-- Breadcrumb -->
              <q-breadcrumbs class="q-mb-md">
                <q-breadcrumbs-el icon="home" to="/" />
                <q-breadcrumbs-el label="Documents" icon="folder" />
                <q-breadcrumbs-el label="Projects" icon="folder" />
              </q-breadcrumbs>

              <!-- File Grid -->
              <div class="file-grid">
                <div
                  v-for="file in files"
                  :key="file.name"
                  class="file-item"
                  :class="{ selected: selectedFiles.includes(file.name) }"
                  @click="toggleFileSelection(file.name)"
                >
                  <q-checkbox
                    :model-value="selectedFiles.includes(file.name)"
                    class="file-checkbox"
                    @click.stop
                    @update:model-value="toggleFileSelection(file.name)"
                  />
                  <div class="file-icon" :style="{ background: file.bgColor }">
                    <q-icon :name="file.icon" :color="file.color" size="32px" />
                  </div>
                  <div class="file-info">
                    <span class="file-name">{{ file.name }}</span>
                    <span class="file-meta">{{ file.size }} • {{ file.date }}</span>
                  </div>
                  <q-btn flat round dense icon="more_vert" size="sm" @click.stop>
                    <q-menu>
                      <q-list dense>
                        <q-item clickable v-close-popup>
                          <q-item-section avatar><q-icon name="visibility" /></q-item-section>
                          <q-item-section>Preview</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                          <q-item-section avatar><q-icon name="download" /></q-item-section>
                          <q-item-section>Download</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                          <q-item-section avatar><q-icon name="share" /></q-item-section>
                          <q-item-section>Share</q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable v-close-popup class="text-negative">
                          <q-item-section avatar><q-icon name="delete" /></q-item-section>
                          <q-item-section>Delete</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>

              <!-- Storage Info -->
              <div class="storage-info q-mt-lg">
                <div class="storage-header">
                  <span>Storage Used</span>
                  <span class="storage-value">24.5 GB / 50 GB</span>
                </div>
                <q-linear-progress
                  :value="0.49"
                  color="primary"
                  track-color="grey-3"
                  rounded
                  size="8px"
                />
                <div class="storage-breakdown">
                  <div class="storage-type">
                    <div class="type-dot" style="background: #6366f1"></div>
                    <span>Documents</span>
                    <span class="type-size">8.2 GB</span>
                  </div>
                  <div class="storage-type">
                    <div class="type-dot" style="background: #22c55e"></div>
                    <span>Images</span>
                    <span class="type-size">10.1 GB</span>
                  </div>
                  <div class="storage-type">
                    <div class="type-dot" style="background: #f59e0b"></div>
                    <span>Videos</span>
                    <span class="type-size">6.2 GB</span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Pricing Cards -->
        <div class="col-12">
          <div class="section-header q-mb-lg">
            <h2 class="section-title">Choose Your Plan</h2>
            <p class="section-subtitle">Flexible pricing for teams of all sizes</p>
          </div>

          <div class="pricing-grid">
            <q-card
              v-for="plan in pricingPlans"
              :key="plan.name"
              class="pricing-card"
              :class="{ featured: plan.featured }"
              flat
            >
              <div v-if="plan.featured" class="featured-badge">
                <q-icon name="star" size="14px" /> Most Popular
              </div>
              <q-card-section class="text-center">
                <h3 class="plan-name">{{ plan.name }}</h3>
                <div class="plan-price">
                  <span class="price-currency">$</span>
                  <span class="price-amount">{{ plan.price }}</span>
                  <span class="price-period">/month</span>
                </div>
                <p class="plan-desc">{{ plan.description }}</p>

                <q-list class="plan-features">
                  <q-item v-for="feature in plan.features" :key="feature" dense>
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="20px" />
                    </q-item-section>
                    <q-item-section>{{ feature }}</q-item-section>
                  </q-item>
                </q-list>

                <q-btn
                  :unelevated="plan.featured"
                  :outline="!plan.featured"
                  :color="plan.featured ? 'primary' : 'grey-7'"
                  label="Get Started"
                  class="full-width q-mt-md"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Testimonials -->
        <div class="col-12">
          <div class="section-header q-mb-lg">
            <h2 class="section-title">What Developers Say</h2>
            <p class="section-subtitle">Join thousands of satisfied developers</p>
          </div>

          <div class="testimonials-grid">
            <q-card
              v-for="testimonial in testimonials"
              :key="testimonial.name"
              class="testimonial-card"
              flat
            >
              <q-card-section>
                <div class="testimonial-rating q-mb-md">
                  <q-icon v-for="i in 5" :key="i" name="star" color="amber" size="20px" />
                </div>
                <p class="testimonial-text">"{{ testimonial.text }}"</p>
                <div class="testimonial-author">
                  <q-avatar size="48px">
                    <img :src="testimonial.avatar" />
                  </q-avatar>
                  <div>
                    <div class="author-name">{{ testimonial.name }}</div>
                    <div class="author-role">{{ testimonial.role }}</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">Ready to Build Something Amazing?</h2>
        <p class="cta-subtitle">
          Start building with Quasar today and experience the power of a truly unified framework.
        </p>
        <div class="cta-actions">
          <q-btn
            unelevated
            color="white"
            text-color="primary"
            label="Start Free Trial"
            icon="rocket_launch"
            size="lg"
          />
          <q-btn outline color="white" label="Schedule Demo" icon="calendar_today" size="lg" />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">
            <q-icon name="auto_awesome" size="32px" color="primary" />
            <span class="logo-text">Quasar</span>
          </div>
          <p class="footer-desc">Build high-performance Vue.js user interfaces in record time.</p>
          <div class="social-links">
            <q-btn flat round icon="fab fa-github" />
            <q-btn flat round icon="fab fa-twitter" />
            <q-btn flat round icon="fab fa-discord" />
            <q-btn flat round icon="fab fa-youtube" />
          </div>
        </div>

        <div class="footer-links">
          <div class="footer-column">
            <h4>Product</h4>
            <a href="#">Features</a>
            <a href="#">Components</a>
            <a href="#">Pricing</a>
            <a href="#">Changelog</a>
          </div>
          <div class="footer-column">
            <h4>Resources</h4>
            <a href="#">Documentation</a>
            <a href="#">Tutorials</a>
            <a href="#">Blog</a>
            <a href="#">Community</a>
          </div>
          <div class="footer-column">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
            <a href="#">Partners</a>
          </div>
        </div>
      </div>

      <q-separator dark />

      <div class="footer-bottom">
        <span>© 2024 Quasar Framework. All rights reserved.</span>
        <div class="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

// Platforms Data
const platforms = ref([
  {
    name: 'Web (SPA/SSR)',
    icon: 'language',
    description: 'Build responsive single-page or server-side rendered applications',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    techs: ['Vue 3', 'Vite', 'Webpack'],
  },
  {
    name: 'Mobile Apps',
    icon: 'smartphone',
    description: 'Native iOS and Android apps with Capacitor or Cordova',
    gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
    techs: ['Capacitor', 'Cordova', 'iOS', 'Android'],
  },
  {
    name: 'Desktop Apps',
    icon: 'desktop_windows',
    description: 'Cross-platform desktop applications with Electron',
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    techs: ['Electron', 'Windows', 'macOS', 'Linux'],
  },
  {
    name: 'Browser Extension',
    icon: 'extension',
    description: 'Build extensions for Chrome, Firefox, and other browsers',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    techs: ['Chrome', 'Firefox', 'Edge'],
  },
])

// Carousel / Products
const carouselSlide = ref(1)
const products = ref([
  {
    id: 1,
    name: 'Premium Headphones',
    description:
      'Wireless noise-canceling headphones with 40-hour battery life and premium sound quality.',
    price: '299',
    oldPrice: '399',
    rating: 4.8,
    reviews: 2456,
    icon: 'headphones',
    gradient: 'linear-gradient(135deg, #1e1e1e, #3d3d3d)',
    badge: '-25%',
    category: { name: 'Electronics', color: 'primary' },
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking, heart rate monitor, GPS, and 7-day battery life.',
    price: '449',
    rating: 4.9,
    reviews: 1823,
    icon: 'watch',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    category: { name: 'Wearables', color: 'purple' },
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with hot-swappable switches and premium build.',
    price: '179',
    oldPrice: '229',
    rating: 4.7,
    reviews: 987,
    icon: 'keyboard',
    gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
    badge: 'NEW',
    category: { name: 'Accessories', color: 'positive' },
  },
])

// Kanban Board
const kanbanColumns = ref([
  {
    id: 'todo',
    title: 'To Do',
    color: '#64748b',
    tasks: [
      {
        id: 'TASK-001',
        title: 'Design new landing page',
        priority: { label: 'High', color: 'negative' },
        assignees: [
          'https://cdn.quasar.dev/img/avatar1.jpg',
          'https://cdn.quasar.dev/img/avatar2.jpg',
        ],
        comments: 5,
      },
      {
        id: 'TASK-002',
        title: 'Review API documentation',
        priority: { label: 'Low', color: 'info' },
        assignees: ['https://cdn.quasar.dev/img/avatar3.jpg'],
        comments: 2,
      },
    ],
  },
  {
    id: 'progress',
    title: 'In Progress',
    color: '#3b82f6',
    tasks: [
      {
        id: 'TASK-003',
        title: 'Implement authentication flow',
        priority: { label: 'High', color: 'negative' },
        assignees: [
          'https://cdn.quasar.dev/img/avatar4.jpg',
          'https://cdn.quasar.dev/img/avatar1.jpg',
        ],
        comments: 12,
      },
      {
        id: 'TASK-004',
        title: 'Database optimization',
        priority: { label: 'Medium', color: 'warning' },
        assignees: ['https://cdn.quasar.dev/img/avatar2.jpg'],
        comments: 8,
      },
    ],
  },
  {
    id: 'review',
    title: 'In Review',
    color: '#f59e0b',
    tasks: [
      {
        id: 'TASK-005',
        title: 'Unit tests for user module',
        priority: { label: 'Medium', color: 'warning' },
        assignees: [
          'https://cdn.quasar.dev/img/avatar3.jpg',
          'https://cdn.quasar.dev/img/avatar4.jpg',
        ],
        comments: 3,
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    color: '#22c55e',
    tasks: [
      {
        id: 'TASK-006',
        title: 'Setup CI/CD pipeline',
        priority: { label: 'High', color: 'negative' },
        assignees: ['https://cdn.quasar.dev/img/avatar1.jpg'],
        comments: 15,
      },
    ],
  },
])

// Chat
const chatInput = ref('')
const chatMessages = ref([
  { id: 1, text: "Hey! How's the Quasar migration going?", time: '10:30 AM', own: false },
  {
    id: 2,
    text: "It's going great! The component library is amazing 🚀",
    time: '10:32 AM',
    own: true,
  },
  {
    id: 3,
    text: 'The documentation is so well organized, made the transition super smooth',
    time: '10:32 AM',
    own: true,
  },
  {
    id: 4,
    text: "That's awesome! Did you try the mobile build yet?",
    time: '10:35 AM',
    own: false,
  },
  {
    id: 5,
    text: 'Yes! One codebase, deployed to iOS and Android. Mind blown! 🤯',
    time: '10:37 AM',
    own: true,
  },
])

// Music Player
const isPlaying = ref(false)
const musicProgress = ref(35)
const volume = ref(75)
const currentTime = computed(() => {
  const mins = Math.floor((musicProgress.value * 2.4) / 60)
  const secs = Math.floor((musicProgress.value * 2.4) % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
})
const currentTrack = ref({
  name: 'Midnight City',
  artist: 'M83',
  duration: '4:03',
  icon: 'album',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
})

// Analytics
const analyticsTab = ref('traffic')
const chartPoints = ref([
  { x: 20, y: 100 },
  { x: 60, y: 60 },
  { x: 100, y: 80 },
  { x: 140, y: 40 },
  { x: 180, y: 70 },
  { x: 220, y: 30 },
  { x: 260, y: 50 },
  { x: 300, y: 20 },
  { x: 340, y: 60 },
  { x: 380, y: 35 },
])

const linePath = computed(() => {
  return chartPoints.value.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
})

const areaPath = computed(() => {
  const line = chartPoints.value.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  return `${line} L 380 150 L 20 150 Z`
})

const miniStats = ref([
  {
    label: 'Page Views',
    value: '124.5K',
    trend: 12.5,
    icon: 'visibility',
    color: 'primary',
    bgColor: 'rgba(99, 102, 241, 0.1)',
  },
  {
    label: 'Sessions',
    value: '45.2K',
    trend: 8.3,
    icon: 'people',
    color: 'positive',
    bgColor: 'rgba(34, 197, 94, 0.1)',
  },
  {
    label: 'Bounce Rate',
    value: '32.1%',
    trend: -5.2,
    icon: 'trending_down',
    color: 'warning',
    bgColor: 'rgba(245, 158, 11, 0.1)',
  },
  {
    label: 'Avg. Duration',
    value: '4m 32s',
    trend: 15.8,
    icon: 'schedule',
    color: 'info',
    bgColor: 'rgba(59, 130, 246, 0.1)',
  },
])

// Weather
const forecast = ref([
  { day: 'Mon', icon: 'wb_sunny', color: 'amber', temp: 29 },
  { day: 'Tue', icon: 'wb_cloudy', color: 'grey', temp: 24 },
  { day: 'Wed', icon: 'thunderstorm', color: 'blue-grey', temp: 22 },
  { day: 'Thu', icon: 'wb_sunny', color: 'amber', temp: 27 },
  { day: 'Fri', icon: 'wb_sunny', color: 'amber', temp: 30 },
])

// File Manager
const selectedFiles = ref([])
const toggleFileSelection = (name) => {
  const idx = selectedFiles.value.indexOf(name)
  if (idx > -1) {
    selectedFiles.value.splice(idx, 1)
  } else {
    selectedFiles.value.push(name)
  }
}

const files = ref([
  {
    name: 'Project Proposal.pdf',
    icon: 'picture_as_pdf',
    color: 'negative',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    size: '2.4 MB',
    date: 'Jan 15',
  },
  {
    name: 'Design Assets',
    icon: 'folder',
    color: 'warning',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    size: '156 MB',
    date: 'Jan 14',
  },
  {
    name: 'Financial Report.xlsx',
    icon: 'table_chart',
    color: 'positive',
    bgColor: 'rgba(34, 197, 94, 0.1)',
    size: '1.8 MB',
    date: 'Jan 13',
  },
  {
    name: 'Presentation.pptx',
    icon: 'slideshow',
    color: 'warning',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    size: '8.5 MB',
    date: 'Jan 12',
  },
  {
    name: 'Source Code',
    icon: 'folder',
    color: 'primary',
    bgColor: 'rgba(99, 102, 241, 0.1)',
    size: '45 MB',
    date: 'Jan 11',
  },
  {
    name: 'Meeting Notes.docx',
    icon: 'description',
    color: 'info',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    size: '524 KB',
    date: 'Jan 10',
  },
])

// Pricing
const pricingPlans = ref([
  {
    name: 'Starter',
    price: 0,
    description: 'Perfect for side projects',
    features: ['Up to 3 projects', '1GB storage', 'Community support', 'Basic analytics'],
  },
  {
    name: 'Professional',
    price: 29,
    description: 'For growing businesses',
    featured: true,
    features: [
      'Unlimited projects',
      '50GB storage',
      'Priority support',
      'Advanced analytics',
      'Custom domains',
      'Team collaboration',
    ],
  },
  {
    name: 'Enterprise',
    price: 99,
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Unlimited storage',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'On-premise option',
    ],
  },
])

// Testimonials
const testimonials = ref([
  {
    name: 'Alex Johnson',
    role: 'Senior Developer at TechCorp',
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    text: 'Quasar has completely transformed our development workflow. Building for web, mobile, and desktop from a single codebase is a game-changer.',
  },
  {
    name: 'Maria Garcia',
    role: 'CTO at StartupXYZ',
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    text: 'The component library is incredible. We reduced our development time by 40% and the results look stunning across all platforms.',
  },
  {
    name: 'David Chen',
    role: 'Lead Engineer at DevStudio',
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
    text: 'Best framework decision we ever made. The documentation is excellent and the community is incredibly helpful.',
  },
])
</script>

<style lang="scss">
// Variables
$card-radius: 16px;
$transition: all 0.3s ease;

// Hero Section
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
}

.hero-chip {
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  color: white;
  line-height: 1.1;
  margin: 0 0 1.5rem;
}

.gradient-text {
  background: linear-gradient(135deg, #818cf8, #c084fc, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0 0 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;

  .hero-btn {
    border-radius: 12px;
    padding: 0.75rem 2rem;
  }
}

.hero-stats {
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-stat {
  text-align: center;

  .stat-number {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
  }

  .stat-label {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  color: rgba(255, 255, 255, 0.5);
}

.bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

// Sections
.section {
  padding: 5rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0.75rem 0 0.5rem;

  .body--dark & {
    color: #f1f5f9;
  }
}

.section-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  margin: 0;
}

// Platform Cards
.platforms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.platform-card {
  border-radius: $card-radius;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: $transition;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  .body--dark & {
    background: #1e293b;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

.platform-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.platform-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem;

  .body--dark & {
    color: #f1f5f9;
  }
}

.platform-desc {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0 0 1rem;
}

.platform-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tech-badge {
  font-size: 0.75rem;
}

// Showcase Cards
.showcase-card {
  border-radius: $card-radius;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;

  .body--dark & {
    background: #1e293b;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);

  .body--dark & {
    background: rgba(30, 41, 59, 0.8);
  }
}

.card-title {
  font-size: 1.25rem;
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

// Product Carousel
.product-carousel {
  background: transparent;
}

.product-image {
  height: 100%;
  min-height: 280px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;

  .body--dark & {
    color: #f1f5f9;
  }
}

.product-desc {
  color: #64748b;
  line-height: 1.6;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .rating-count {
    color: #64748b;
    font-size: 0.875rem;
  }
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;

  .price-current {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--q-primary);
  }

  .price-old {
    font-size: 1.125rem;
    color: #94a3b8;
    text-decoration: line-through;
  }
}

.product-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

// Kanban Board
.kanban-board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.kanban-column {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1rem;
  min-width: 250px;

  .body--dark & {
    background: #0f172a;
  }
}

.kanban-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.kanban-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.kanban-title {
  font-weight: 600;
  color: #1e293b;

  .body--dark & {
    color: #f1f5f9;
  }
}

.kanban-tasks {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.kanban-task {
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: grab;
  transition: $transition;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .body--dark & {
    background: #1e293b;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

.task-id {
  font-size: 0.7rem;
  color: #94a3b8;
}

.task-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
  margin: 0.5rem 0;

  .body--dark & {
    color: #e2e8f0;
  }
}

.task-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task-assignees {
  display: flex;

  .assignee-avatar {
    margin-left: -8px;
    border: 2px solid white;

    &:first-child {
      margin-left: 0;
    }

    .body--dark & {
      border-color: #1e293b;
    }
  }
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #94a3b8;
  font-size: 0.75rem;
}

// Chat Card
.chat-card {
  height: 480px;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;

  .body--dark & {
    color: #f1f5f9;
  }
}

.chat-status {
  font-size: 0.8rem;
  color: #22c55e;
}

.chat-actions {
  display: flex;
  gap: 0.25rem;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem !important;
}

.chat-message {
  display: flex;
  gap: 0.75rem;
  max-width: 80%;

  &.own {
    margin-left: auto;
    flex-direction: row-reverse;

    .msg-bubble {
      background: var(--q-primary);
      color: white;
      border-radius: 16px 16px 4px 16px;
    }

    .msg-time {
      text-align: right;
    }
  }
}

.msg-bubble {
  background: #f1f5f9;
  padding: 0.75rem 1rem;
  border-radius: 16px 16px 16px 4px;
  font-size: 0.9rem;
  color: #334155;

  .body--dark & {
    background: #334155;
    color: #e2e8f0;
  }
}

.msg-time {
  font-size: 0.7rem;
  color: #94a3b8;
  margin-top: 0.25rem;
}

.chat-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem !important;
}

// Music Card
.music-card {
  position: relative;
  overflow: hidden;
  min-height: 480px;
}

.music-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.music-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
}

.album-art {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.vinyl-effect {
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.track-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.track-artist {
  font-size: 1rem;
  opacity: 0.8;
  margin: 0.25rem 0 1.5rem;
}

.music-progress {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  .time-current,
  .time-total {
    font-size: 0.8rem;
    opacity: 0.8;
    min-width: 40px;
  }

  .progress-slider {
    flex: 1;
  }
}

.music-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.music-extra {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .volume-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    max-width: 150px;
  }

  .volume-slider {
    flex: 1;
  }
}

// Analytics Chart
.chart-area {
  height: 200px;
  margin-bottom: 1.5rem;
}

.area-chart {
  width: 100%;
  height: 100%;
}

.area-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 2s ease forwards;
}

.area-fill {
  opacity: 0;
  animation: fadeIn 1s ease 0.5s forwards;
}

.chart-dot {
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: #{0.5 + ($i * 0.1)}s;
    }
  }
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

// Mini Stats
.mini-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.mini-stat {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;

  .body--dark & {
    background: #0f172a;
  }
}

.mini-stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-stat-info {
  flex: 1;

  .mini-stat-value {
    display: block;
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;

    .body--dark & {
      color: #f1f5f9;
    }
  }

  .mini-stat-label {
    font-size: 0.8rem;
    color: #64748b;
  }
}

// Weather Card
.weather-card {
  position: relative;
  overflow: hidden;
}

.weather-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
}

.weather-content {
  position: relative;
  z-index: 1;
  color: white;
}

.weather-location {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

.weather-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
}

.weather-temp {
  .temp-value {
    font-size: 4rem;
    font-weight: 700;
    line-height: 1;
  }

  .temp-unit {
    font-size: 1.5rem;
    vertical-align: top;
  }
}

.weather-desc {
  text-align: center;
  opacity: 0.9;
  margin: 0 0 1.5rem;
}

.weather-details {
  display: flex;
  justify-content: space-around;
}

.weather-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  .detail-label {
    font-size: 0.75rem;
    opacity: 0.7;
  }
}

.weather-forecast {
  display: flex;
  justify-content: space-between;
}

.forecast-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  .forecast-name {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .forecast-temp {
    font-weight: 600;
  }
}

// File Manager
.file-actions {
  display: flex;
  gap: 0.75rem;
}

.file-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: $transition;
  position: relative;

  &:hover {
    background: #f1f5f9;
  }

  &.selected {
    border-color: var(--q-primary);
    background: rgba(99, 102, 241, 0.05);
  }

  .body--dark & {
    background: #0f172a;

    &:hover {
      background: #1e293b;
    }
  }
}

.file-checkbox {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;

  .file-item:hover &,
  .file-item.selected & {
    opacity: 1;
  }
}

.file-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.file-info {
  flex: 1;
  min-width: 0;

  .file-name {
    display: block;
    font-weight: 500;
    color: #1e293b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .body--dark & {
      color: #f1f5f9;
    }
  }

  .file-meta {
    font-size: 0.75rem;
    color: #64748b;
  }
}

// Storage Info
.storage-info {
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;

  .body--dark & {
    background: #0f172a;
  }
}

.storage-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: #64748b;

  .storage-value {
    font-weight: 600;
    color: #1e293b;

    .body--dark & {
      color: #f1f5f9;
    }
  }
}

.storage-breakdown {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}

.storage-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #64748b;

  .type-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .type-size {
    margin-left: auto;
    font-weight: 500;
    color: #1e293b;

    .body--dark & {
      color: #f1f5f9;
    }
  }
}

// Pricing Cards
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.pricing-card {
  border-radius: $card-radius;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  transition: $transition;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  &.featured {
    border-color: var(--q-primary);
    transform: scale(1.05);

    &:hover {
      transform: scale(1.05) translateY(-4px);
    }
  }

  .body--dark & {
    background: #1e293b;
    border-color: rgba(255, 255, 255, 0.05);

    &.featured {
      border-color: var(--q-primary);
    }
  }
}

.featured-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--q-primary);
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.plan-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #64748b;
  margin: 0 0 1rem;
}

.plan-price {
  margin-bottom: 0.5rem;

  .price-currency {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    vertical-align: top;

    .body--dark & {
      color: #f1f5f9;
    }
  }

  .price-amount {
    font-size: 3.5rem;
    font-weight: 700;
    color: #1e293b;
    line-height: 1;

    .body--dark & {
      color: #f1f5f9;
    }
  }

  .price-period {
    font-size: 1rem;
    color: #64748b;
  }
}

.plan-desc {
  color: #64748b;
  margin: 0 0 1.5rem;
}

.plan-features {
  text-align: left;

  .q-item {
    min-height: 40px;
    padding: 0;
  }
}

// Testimonials
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.testimonial-card {
  border-radius: $card-radius;
  border: 1px solid rgba(0, 0, 0, 0.05);

  .body--dark & {
    background: #1e293b;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

.testimonial-text {
  font-size: 1rem;
  line-height: 1.7;
  color: #475569;
  margin: 0 0 1.5rem;

  .body--dark & {
    color: #cbd5e1;
  }
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;

  .author-name {
    font-weight: 600;
    color: #1e293b;

    .body--dark & {
      color: #f1f5f9;
    }
  }

  .author-role {
    font-size: 0.875rem;
    color: #64748b;
  }
}

// CTA Section
.cta-section {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
  padding: 5rem 2rem;
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem;
}

.cta-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 2rem;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  .q-btn {
    border-radius: 12px;
  }
}

// Footer
.app-footer {
  background: #0f172a;
  color: white;
  padding: 4rem 2rem 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 4rem;
  padding-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;

  .logo-text {
    font-size: 1.5rem;
    font-weight: 700;
  }
}

.footer-desc {
  color: #94a3b8;
  margin: 0 0 1.5rem;
  max-width: 300px;
}

.social-links {
  display: flex;
  gap: 0.5rem;

  .q-btn {
    color: #94a3b8;

    &:hover {
      color: white;
    }
  }
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.footer-column {
  h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
    margin: 0 0 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  a {
    display: block;
    color: #94a3b8;
    text-decoration: none;
    padding: 0.4rem 0;
    font-size: 0.9rem;
    transition: color 0.2s;

    &:hover {
      color: white;
    }
  }
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.875rem;
  color: #64748b;
}

.footer-legal {
  display: flex;
  gap: 2rem;

  a {
    color: #64748b;
    text-decoration: none;

    &:hover {
      color: white;
    }
  }
}

// Utilities
.gap-sm {
  gap: 0.5rem;
}

.gap-md {
  gap: 1rem;
}

.status-dot {
  width: 12px !important;
  height: 12px !important;
  min-height: 12px !important;
}

// Analytics Tabs
.analytics-tabs {
  .q-tab {
    text-transform: none;
    font-weight: 500;
  }
}
</style>
