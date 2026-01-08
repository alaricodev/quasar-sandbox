<template>
  <q-page class="contracts-page">
    <!-- Header da Página -->
    <div class="page-header">
      <div class="header-content">
        <div>
          <div class="flex items-center gap-sm q-mb-xs">
            <q-icon name="assignment" size="28px" color="primary" />
            <h1 class="page-title">Gestão de Contratos Terceirizados</h1>
          </div>
          <p class="page-subtitle">
            Gerencie contratos, postos de trabalho, colaboradores e fiscais
          </p>
        </div>
        <div class="header-actions">
          <q-btn outline color="primary" icon="download" label="Exportar" />
          <q-btn
            unelevated
            color="primary"
            icon="add"
            label="Novo Contrato"
            @click="openContractDialog"
          />
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon bg-primary-light">
            <q-icon name="description" color="primary" size="24px" />
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ contracts.length }}</span>
            <span class="stat-label">Contratos Ativos</span>
          </div>
          <q-icon name="trending_up" color="positive" size="20px" />
        </div>

        <div class="stat-card">
          <div class="stat-icon bg-positive-light">
            <q-icon name="location_on" color="positive" size="24px" />
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ totalPostos }}</span>
            <span class="stat-label">Postos de Trabalho</span>
          </div>
          <q-icon name="trending_up" color="positive" size="20px" />
        </div>

        <div class="stat-card">
          <div class="stat-icon bg-info-light">
            <q-icon name="groups" color="info" size="24px" />
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ totalTrabalhadores }}</span>
            <span class="stat-label">Colaboradores</span>
          </div>
          <q-icon name="trending_up" color="positive" size="20px" />
        </div>

        <div class="stat-card">
          <div class="stat-icon bg-warning-light">
            <q-icon name="verified_user" color="warning" size="24px" />
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ fiscais.length }}</span>
            <span class="stat-label">Fiscais</span>
          </div>
          <q-icon name="remove" color="grey" size="20px" />
        </div>
      </div>
    </div>

    <!-- Tabs de Navegação -->
    <div class="content-section">
      <q-card flat class="main-card">
        <q-tabs
          v-model="activeTab"
          class="main-tabs"
          active-color="primary"
          indicator-color="primary"
          align="left"
        >
          <q-tab name="contratos" icon="description" label="Contratos" />
          <q-tab name="postos" icon="location_on" label="Postos de Trabalho" />
          <q-tab name="trabalhadores" icon="badge" label="Colaboradores" />
          <q-tab name="fiscais" icon="verified_user" label="Fiscais" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="activeTab" animated class="tab-panels">
          <!-- Tab Contratos -->
          <q-tab-panel name="contratos" class="q-pa-none">
            <div class="panel-header">
              <div class="search-filters">
                <q-input
                  v-model="searchContratos"
                  outlined
                  dense
                  placeholder="Buscar contratos..."
                  class="search-input"
                >
                  <template #prepend>
                    <q-icon name="search" />
                  </template>
                  <template #append>
                    <q-icon
                      v-if="searchContratos"
                      name="close"
                      class="cursor-pointer"
                      @click="searchContratos = ''"
                    />
                  </template>
                </q-input>

                <q-select
                  v-model="filterStatus"
                  outlined
                  dense
                  :options="statusOptions"
                  label="Status"
                  class="filter-select"
                  emit-value
                  map-options
                  clearable
                />

                <q-select
                  v-model="filterEmpresa"
                  outlined
                  dense
                  :options="empresaOptions"
                  label="Empresa"
                  class="filter-select"
                  emit-value
                  map-options
                  clearable
                />
              </div>

              <div class="view-toggle">
                <q-btn-toggle
                  v-model="viewMode"
                  unelevated
                  rounded
                  toggle-color="primary"
                  :options="[
                    { value: 'cards', slot: 'cards' },
                    { value: 'table', slot: 'table' },
                  ]"
                >
                  <template #cards>
                    <q-icon name="grid_view" />
                  </template>
                  <template #table>
                    <q-icon name="view_list" />
                  </template>
                </q-btn-toggle>
              </div>
            </div>

            <!-- View Cards -->
            <div v-if="viewMode === 'cards'" class="contracts-grid">
              <q-card
                v-for="contract in filteredContratos"
                :key="contract.id"
                class="contract-card"
                flat
              >
                <q-card-section class="contract-header">
                  <div class="flex items-center justify-between">
                    <q-chip
                      :color="getStatusColor(contract.status)"
                      text-color="white"
                      size="sm"
                      dense
                    >
                      {{ contract.status }}
                    </q-chip>
                    <q-btn flat round dense icon="more_vert" size="sm">
                      <q-menu>
                        <q-list dense>
                          <q-item clickable v-close-popup @click="viewContract(contract)">
                            <q-item-section avatar><q-icon name="visibility" /></q-item-section>
                            <q-item-section>Visualizar</q-item-section>
                          </q-item>
                          <q-item clickable v-close-popup @click="editContract(contract)">
                            <q-item-section avatar><q-icon name="edit" /></q-item-section>
                            <q-item-section>Editar</q-item-section>
                          </q-item>
                          <q-item clickable v-close-popup>
                            <q-item-section avatar><q-icon name="content_copy" /></q-item-section>
                            <q-item-section>Duplicar</q-item-section>
                          </q-item>
                          <q-separator />
                          <q-item clickable v-close-popup class="text-negative">
                            <q-item-section avatar><q-icon name="delete" /></q-item-section>
                            <q-item-section>Excluir</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                  <h3 class="contract-number">{{ contract.numero }}</h3>
                  <p class="contract-object">{{ contract.objeto }}</p>
                </q-card-section>

                <q-separator />

                <q-card-section class="contract-details">
                  <div class="detail-row">
                    <q-icon name="business" size="18px" color="grey-6" />
                    <span>{{ contract.empresa }}</span>
                  </div>
                  <div class="detail-row">
                    <q-icon name="event" size="18px" color="grey-6" />
                    <span>{{ contract.vigencia.inicio }} - {{ contract.vigencia.fim }}</span>
                  </div>
                  <div class="detail-row">
                    <q-icon name="attach_money" size="18px" color="grey-6" />
                    <span>{{ formatCurrency(contract.valorMensal) }}/mês</span>
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-section class="contract-footer">
                  <div class="footer-stats">
                    <div class="footer-stat">
                      <q-icon name="location_on" size="16px" color="primary" />
                      <span>{{ contract.postos }} postos</span>
                    </div>
                    <div class="footer-stat">
                      <q-icon name="people" size="16px" color="info" />
                      <span>{{ contract.trabalhadores }} colab.</span>
                    </div>
                  </div>
                  <q-avatar size="32px" class="fiscal-avatar">
                    <img :src="contract.fiscal.avatar" />
                    <q-tooltip>Fiscal: {{ contract.fiscal.nome }}</q-tooltip>
                  </q-avatar>
                </q-card-section>

                <!-- Progress de vigência -->
                <div class="contract-progress">
                  <q-linear-progress
                    :value="contract.progressoVigencia"
                    :color="contract.progressoVigencia > 0.8 ? 'warning' : 'primary'"
                    size="4px"
                  />
                </div>
              </q-card>
            </div>

            <!-- View Table -->
            <div v-else class="table-container">
              <q-table
                :rows="filteredContratos"
                :columns="contratosColumns"
                row-key="id"
                flat
                :pagination="{ rowsPerPage: 10 }"
                class="contracts-table"
              >
                <template #body-cell-numero="props">
                  <q-td :props="props">
                    <div class="flex items-center gap-sm">
                      <q-avatar size="36px" color="primary" text-color="white" font-size="14px">
                        {{ props.row.numero.slice(-3) }}
                      </q-avatar>
                      <div>
                        <div class="text-weight-medium">{{ props.row.numero }}</div>
                        <div class="text-caption text-grey-6">{{ props.row.empresa }}</div>
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
                      dense
                    >
                      {{ props.row.status }}
                    </q-chip>
                  </q-td>
                </template>

                <template #body-cell-valorMensal="props">
                  <q-td :props="props">
                    <span class="text-weight-medium">{{
                      formatCurrency(props.row.valorMensal)
                    }}</span>
                  </q-td>
                </template>

                <template #body-cell-fiscal="props">
                  <q-td :props="props">
                    <div class="flex items-center gap-sm">
                      <q-avatar size="28px">
                        <img :src="props.row.fiscal.avatar" />
                      </q-avatar>
                      <span>{{ props.row.fiscal.nome }}</span>
                    </div>
                  </q-td>
                </template>

                <template #body-cell-actions="props">
                  <q-td :props="props">
                    <q-btn
                      flat
                      round
                      dense
                      icon="visibility"
                      size="sm"
                      color="primary"
                      @click="viewContract(props.row)"
                    >
                      <q-tooltip>Visualizar</q-tooltip>
                    </q-btn>
                    <q-btn
                      flat
                      round
                      dense
                      icon="edit"
                      size="sm"
                      color="info"
                      @click="editContract(props.row)"
                    >
                      <q-tooltip>Editar</q-tooltip>
                    </q-btn>
                    <q-btn flat round dense icon="delete" size="sm" color="negative">
                      <q-tooltip>Excluir</q-tooltip>
                    </q-btn>
                  </q-td>
                </template>
              </q-table>
            </div>
          </q-tab-panel>

          <!-- Tab Postos de Trabalho -->
          <q-tab-panel name="postos" class="q-pa-none">
            <div class="panel-header">
              <div class="search-filters">
                <q-input
                  v-model="searchPostos"
                  outlined
                  dense
                  placeholder="Buscar postos..."
                  class="search-input"
                >
                  <template #prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>

                <q-select
                  v-model="filterContrato"
                  outlined
                  dense
                  :options="contratoOptions"
                  label="Contrato"
                  class="filter-select"
                  emit-value
                  map-options
                  clearable
                />

                <q-select
                  v-model="filterTurno"
                  outlined
                  dense
                  :options="turnoOptions"
                  label="Turno"
                  class="filter-select"
                  emit-value
                  map-options
                  clearable
                />
              </div>

              <q-btn
                unelevated
                color="primary"
                icon="add"
                label="Novo Posto"
                @click="openPostoDialog"
              />
            </div>

            <div class="postos-grid">
              <q-card v-for="posto in filteredPostos" :key="posto.id" class="posto-card" flat>
                <q-card-section>
                  <div class="flex items-center justify-between q-mb-md">
                    <q-chip
                      :color="posto.ocupado ? 'positive' : 'grey'"
                      text-color="white"
                      size="sm"
                      dense
                      :icon="posto.ocupado ? 'check_circle' : 'cancel'"
                    >
                      {{ posto.ocupado ? 'Ocupado' : 'Vago' }}
                    </q-chip>
                    <q-chip outline color="primary" size="sm" dense>
                      {{ posto.turno }}
                    </q-chip>
                  </div>

                  <h3 class="posto-nome">{{ posto.nome }}</h3>
                  <p class="posto-local">
                    <q-icon name="location_on" size="16px" />
                    {{ posto.local }}
                  </p>

                  <q-separator class="q-my-md" />

                  <div class="posto-info">
                    <div class="info-item">
                      <span class="info-label">Contrato</span>
                      <span class="info-value">{{ posto.contrato }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Função</span>
                      <span class="info-value">{{ posto.funcao }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Carga Horária</span>
                      <span class="info-value">{{ posto.cargaHoraria }}h/semana</span>
                    </div>
                  </div>

                  <q-separator class="q-my-md" />

                  <!-- Trabalhador alocado -->
                  <div v-if="posto.trabalhador" class="trabalhador-alocado">
                    <div class="flex items-center gap-sm">
                      <q-avatar size="40px">
                        <img :src="posto.trabalhador.avatar" />
                      </q-avatar>
                      <div>
                        <div class="text-weight-medium">{{ posto.trabalhador.nome }}</div>
                        <div class="text-caption text-grey-6">{{ posto.trabalhador.cpf }}</div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="vago-placeholder">
                    <q-icon name="person_add" size="24px" color="grey-5" />
                    <span>Nenhum colaborador alocado</span>
                    <q-btn flat dense color="primary" label="Alocar" size="sm" />
                  </div>
                </q-card-section>

                <q-card-actions class="posto-actions">
                  <q-btn flat color="primary" icon="edit" label="Editar" size="sm" />
                  <q-space />
                  <q-btn flat color="info" icon="swap_horiz" label="Substituir" size="sm" />
                </q-card-actions>
              </q-card>
            </div>
          </q-tab-panel>

          <!-- Tab Colaboradores -->
          <q-tab-panel name="trabalhadores" class="q-pa-none">
            <div class="panel-header">
              <div class="search-filters">
                <q-input
                  v-model="searchTrabalhadores"
                  outlined
                  dense
                  placeholder="Buscar colaboradores..."
                  class="search-input"
                >
                  <template #prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>

                <q-select
                  v-model="filterFuncao"
                  outlined
                  dense
                  :options="funcaoOptions"
                  label="Função"
                  class="filter-select"
                  emit-value
                  map-options
                  clearable
                />

                <q-select
                  v-model="filterSituacao"
                  outlined
                  dense
                  :options="situacaoOptions"
                  label="Situação"
                  class="filter-select"
                  emit-value
                  map-options
                  clearable
                />
              </div>

              <q-btn
                unelevated
                color="primary"
                icon="person_add"
                label="Novo Colaborador"
                @click="openTrabalhadorDialog"
              />
            </div>

            <q-table
              :rows="filteredTrabalhadores"
              :columns="trabalhadoresColumns"
              row-key="id"
              flat
              :pagination="{ rowsPerPage: 10 }"
              class="trabalhadores-table"
              selection="multiple"
              v-model:selected="selectedTrabalhadores"
            >
              <template #top-selection>
                <div class="flex items-center gap-md q-pa-sm">
                  <span class="text-subtitle2"
                    >{{ selectedTrabalhadores.length }} selecionado(s)</span
                  >
                  <q-btn flat color="primary" icon="print" label="Imprimir Crachás" size="sm" />
                  <q-btn flat color="info" icon="mail" label="Enviar E-mail" size="sm" />
                  <q-btn flat color="negative" icon="delete" label="Excluir" size="sm" />
                </div>
              </template>

              <template #body-cell-nome="props">
                <q-td :props="props">
                  <div class="flex items-center gap-sm">
                    <q-avatar size="40px">
                      <img :src="props.row.avatar" />
                      <q-badge
                        :color="props.row.situacao === 'Ativo' ? 'positive' : 'grey'"
                        floating
                        rounded
                        class="status-badge"
                      />
                    </q-avatar>
                    <div>
                      <div class="text-weight-medium">{{ props.row.nome }}</div>
                      <div class="text-caption text-grey-6">{{ props.row.email }}</div>
                    </div>
                  </div>
                </q-td>
              </template>

              <template #body-cell-situacao="props">
                <q-td :props="props">
                  <q-chip
                    :color="
                      props.row.situacao === 'Ativo'
                        ? 'positive'
                        : props.row.situacao === 'Férias'
                          ? 'warning'
                          : 'grey'
                    "
                    text-color="white"
                    size="sm"
                    dense
                  >
                    {{ props.row.situacao }}
                  </q-chip>
                </q-td>
              </template>

              <template #body-cell-documentos="props">
                <q-td :props="props">
                  <div class="doc-status">
                    <q-icon
                      :name="props.row.documentosOk ? 'check_circle' : 'warning'"
                      :color="props.row.documentosOk ? 'positive' : 'warning'"
                      size="20px"
                    />
                    <span :class="props.row.documentosOk ? 'text-positive' : 'text-warning'">
                      {{ props.row.documentosOk ? 'Regular' : 'Pendente' }}
                    </span>
                  </div>
                </q-td>
              </template>

              <template #body-cell-actions="props">
                <q-td :props="props">
                  <q-btn
                    flat
                    round
                    dense
                    icon="visibility"
                    size="sm"
                    color="primary"
                    @click="viewTrabalhador(props.row)"
                  >
                    <q-tooltip>Ver Perfil</q-tooltip>
                  </q-btn>
                  <q-btn flat round dense icon="edit" size="sm" color="info">
                    <q-tooltip>Editar</q-tooltip>
                  </q-btn>
                  <q-btn flat round dense icon="folder" size="sm" color="warning">
                    <q-tooltip>Documentos</q-tooltip>
                  </q-btn>
                  <q-btn flat round dense icon="history" size="sm" color="grey">
                    <q-tooltip>Histórico</q-tooltip>
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </q-tab-panel>

          <!-- Tab Fiscais -->
          <q-tab-panel name="fiscais" class="q-pa-none">
            <div class="panel-header">
              <div class="search-filters">
                <q-input
                  v-model="searchFiscais"
                  outlined
                  dense
                  placeholder="Buscar fiscais..."
                  class="search-input"
                >
                  <template #prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>

              <q-btn
                unelevated
                color="primary"
                icon="person_add"
                label="Novo Fiscal"
                @click="openFiscalDialog"
              />
            </div>

            <div class="fiscais-grid">
              <q-card v-for="fiscal in filteredFiscais" :key="fiscal.id" class="fiscal-card" flat>
                <q-card-section class="text-center">
                  <q-avatar size="80px" class="q-mb-md">
                    <img :src="fiscal.avatar" />
                    <q-badge color="positive" floating rounded class="status-badge-lg">
                      <q-icon name="verified" size="12px" />
                    </q-badge>
                  </q-avatar>

                  <h3 class="fiscal-nome">{{ fiscal.nome }}</h3>
                  <p class="fiscal-cargo">{{ fiscal.cargo }}</p>

                  <div class="fiscal-contacts q-mt-md">
                    <q-chip icon="email" size="sm" outline>{{ fiscal.email }}</q-chip>
                    <q-chip icon="phone" size="sm" outline>{{ fiscal.telefone }}</q-chip>
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-section>
                  <div class="fiscal-stats">
                    <div class="fiscal-stat">
                      <span class="fiscal-stat-value">{{ fiscal.contratosAtivos }}</span>
                      <span class="fiscal-stat-label">Contratos</span>
                    </div>
                    <div class="fiscal-stat">
                      <span class="fiscal-stat-value">{{ fiscal.postosSupervisionados }}</span>
                      <span class="fiscal-stat-label">Postos</span>
                    </div>
                    <div class="fiscal-stat">
                      <span class="fiscal-stat-value">{{ fiscal.avaliacaoMedia }}</span>
                      <span class="fiscal-stat-label">Avaliação</span>
                    </div>
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-section class="q-pa-sm">
                  <div class="fiscal-contratos-label">Contratos Supervisionados:</div>
                  <div class="fiscal-contratos-list">
                    <q-chip
                      v-for="contrato in fiscal.contratos"
                      :key="contrato"
                      size="sm"
                      color="primary"
                      text-color="white"
                      dense
                    >
                      {{ contrato }}
                    </q-chip>
                  </div>
                </q-card-section>

                <q-card-actions class="fiscal-actions">
                  <q-btn flat color="primary" icon="visibility" label="Ver Detalhes" size="sm" />
                  <q-btn flat color="info" icon="edit" label="Editar" size="sm" />
                </q-card-actions>
              </q-card>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>

    <!-- Dialog Novo Contrato -->
    <q-dialog
      v-model="contractDialog"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="dialog-card">
        <q-toolbar class="dialog-toolbar">
          <q-toolbar-title>
            <q-icon name="description" class="q-mr-sm" />
            {{ editingContract ? 'Editar Contrato' : 'Novo Contrato' }}
          </q-toolbar-title>
          <q-btn flat round dense icon="close" @click="contractDialog = false" />
        </q-toolbar>

        <q-card-section class="dialog-content">
          <q-stepper
            v-model="contractStep"
            vertical
            color="primary"
            animated
            class="contract-stepper"
          >
            <!-- Step 1: Dados Básicos -->
            <q-step :name="1" title="Dados do Contrato" icon="description" :done="contractStep > 1">
              <div class="step-content">
                <div class="form-row">
                  <q-input
                    v-model="contractForm.numero"
                    outlined
                    label="Número do Contrato *"
                    placeholder="Ex: CT-2024/001"
                    :rules="[(val) => !!val || 'Campo obrigatório']"
                    class="form-field"
                  />
                  <q-select
                    v-model="contractForm.empresa"
                    outlined
                    label="Empresa Contratada *"
                    :options="empresaOptions"
                    emit-value
                    map-options
                    :rules="[(val) => !!val || 'Campo obrigatório']"
                    class="form-field"
                  />
                </div>

                <q-input
                  v-model="contractForm.objeto"
                  outlined
                  label="Objeto do Contrato *"
                  placeholder="Descreva o objeto do contrato"
                  type="textarea"
                  rows="3"
                  :rules="[(val) => !!val || 'Campo obrigatório']"
                  class="form-field full-width"
                />

                <div class="form-row">
                  <q-input
                    v-model="contractForm.vigenciaInicio"
                    outlined
                    label="Início da Vigência *"
                    mask="##/##/####"
                    placeholder="DD/MM/AAAA"
                    class="form-field"
                  >
                    <template #append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy>
                          <q-date v-model="contractForm.vigenciaInicio" mask="DD/MM/YYYY" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    v-model="contractForm.vigenciaFim"
                    outlined
                    label="Fim da Vigência *"
                    mask="##/##/####"
                    placeholder="DD/MM/AAAA"
                    class="form-field"
                  >
                    <template #append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy>
                          <q-date v-model="contractForm.vigenciaFim" mask="DD/MM/YYYY" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <div class="form-row">
                  <q-input
                    v-model="contractForm.valorMensal"
                    outlined
                    label="Valor Mensal *"
                    prefix="R$"
                    mask="#.###.###,##"
                    reverse-fill-mask
                    class="form-field"
                  />
                  <q-input
                    v-model="contractForm.valorTotal"
                    outlined
                    label="Valor Total"
                    prefix="R$"
                    mask="#.###.###,##"
                    reverse-fill-mask
                    class="form-field"
                  />
                </div>
              </div>

              <q-stepper-navigation>
                <q-btn unelevated color="primary" label="Continuar" @click="contractStep = 2" />
              </q-stepper-navigation>
            </q-step>

            <!-- Step 2: Fiscal -->
            <q-step
              :name="2"
              title="Fiscal Responsável"
              icon="verified_user"
              :done="contractStep > 2"
            >
              <div class="step-content">
                <q-select
                  v-model="contractForm.fiscal"
                  outlined
                  label="Fiscal Responsável *"
                  :options="fiscalOptionsForSelect"
                  emit-value
                  map-options
                  class="form-field full-width"
                >
                  <template #option="{ opt, itemProps }">
                    <q-item v-bind="itemProps">
                      <q-item-section avatar>
                        <q-avatar>
                          <img :src="opt.avatar" />
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ opt.label }}</q-item-label>
                        <q-item-label caption>{{ opt.cargo }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

                <q-input
                  v-model="contractForm.observacoes"
                  outlined
                  label="Observações"
                  type="textarea"
                  rows="4"
                  placeholder="Observações adicionais sobre o contrato"
                  class="form-field full-width"
                />
              </div>

              <q-stepper-navigation>
                <q-btn unelevated color="primary" label="Continuar" @click="contractStep = 3" />
                <q-btn
                  flat
                  color="primary"
                  label="Voltar"
                  @click="contractStep = 1"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>

            <!-- Step 3: Postos -->
            <q-step
              :name="3"
              title="Postos de Trabalho"
              icon="location_on"
              :done="contractStep > 3"
            >
              <div class="step-content">
                <div class="flex items-center justify-between q-mb-md">
                  <span class="text-subtitle1">Postos vinculados ao contrato</span>
                  <q-btn
                    outline
                    color="primary"
                    icon="add"
                    label="Adicionar Posto"
                    size="sm"
                    @click="addPosto"
                  />
                </div>

                <div v-if="contractForm.postos.length === 0" class="empty-postos">
                  <q-icon name="location_off" size="48px" color="grey-5" />
                  <p>Nenhum posto adicionado</p>
                  <q-btn
                    outline
                    color="primary"
                    label="Adicionar Primeiro Posto"
                    @click="addPosto"
                  />
                </div>

                <div v-else class="postos-form-list">
                  <q-card
                    v-for="(posto, index) in contractForm.postos"
                    :key="index"
                    flat
                    class="posto-form-card"
                  >
                    <q-card-section>
                      <div class="flex items-center justify-between q-mb-md">
                        <span class="text-weight-medium">Posto {{ index + 1 }}</span>
                        <q-btn
                          flat
                          round
                          dense
                          icon="delete"
                          color="negative"
                          size="sm"
                          @click="removePosto(index)"
                        />
                      </div>

                      <div class="form-row">
                        <q-input
                          v-model="posto.nome"
                          outlined
                          dense
                          label="Nome do Posto"
                          class="form-field"
                        />
                        <q-input
                          v-model="posto.local"
                          outlined
                          dense
                          label="Local"
                          class="form-field"
                        />
                      </div>
                      <div class="form-row">
                        <q-select
                          v-model="posto.funcao"
                          outlined
                          dense
                          label="Função"
                          :options="funcaoOptions"
                          class="form-field"
                        />
                        <q-select
                          v-model="posto.turno"
                          outlined
                          dense
                          label="Turno"
                          :options="turnoOptions"
                          class="form-field"
                        />
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>

              <q-stepper-navigation>
                <q-btn unelevated color="primary" label="Continuar" @click="contractStep = 4" />
                <q-btn
                  flat
                  color="primary"
                  label="Voltar"
                  @click="contractStep = 2"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>

            <!-- Step 4: Revisão -->
            <q-step :name="4" title="Revisão" icon="fact_check">
              <div class="step-content">
                <q-card flat class="review-card">
                  <q-card-section>
                    <div class="review-section">
                      <h4>Dados do Contrato</h4>
                      <div class="review-grid">
                        <div class="review-item">
                          <span class="review-label">Número</span>
                          <span class="review-value">{{ contractForm.numero || '-' }}</span>
                        </div>
                        <div class="review-item">
                          <span class="review-label">Empresa</span>
                          <span class="review-value">{{ contractForm.empresa || '-' }}</span>
                        </div>
                        <div class="review-item">
                          <span class="review-label">Vigência</span>
                          <span class="review-value"
                            >{{ contractForm.vigenciaInicio }} -
                            {{ contractForm.vigenciaFim }}</span
                          >
                        </div>
                        <div class="review-item">
                          <span class="review-label">Valor Mensal</span>
                          <span class="review-value">R$ {{ contractForm.valorMensal || '-' }}</span>
                        </div>
                      </div>
                    </div>

                    <q-separator class="q-my-md" />

                    <div class="review-section">
                      <h4>Objeto</h4>
                      <p>{{ contractForm.objeto || '-' }}</p>
                    </div>

                    <q-separator class="q-my-md" />

                    <div class="review-section">
                      <h4>Postos de Trabalho</h4>
                      <q-chip
                        v-for="(posto, idx) in contractForm.postos"
                        :key="idx"
                        color="primary"
                        text-color="white"
                      >
                        {{ posto.nome || `Posto ${idx + 1}` }}
                      </q-chip>
                      <span v-if="contractForm.postos.length === 0" class="text-grey-6"
                        >Nenhum posto adicionado</span
                      >
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              <q-stepper-navigation>
                <q-btn
                  unelevated
                  color="primary"
                  label="Salvar Contrato"
                  icon="save"
                  @click="saveContract"
                />
                <q-btn
                  flat
                  color="primary"
                  label="Voltar"
                  @click="contractStep = 3"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog Visualizar Trabalhador -->
    <q-dialog
      v-model="trabalhadorDialog"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card v-if="selectedTrabalhador" class="dialog-card">
        <q-toolbar class="dialog-toolbar">
          <q-toolbar-title>Perfil do Colaborador</q-toolbar-title>
          <q-btn flat round dense icon="close" @click="trabalhadorDialog = false" />
        </q-toolbar>

        <q-card-section class="dialog-content">
          <div class="profile-header">
            <q-avatar size="120px" class="profile-avatar">
              <img :src="selectedTrabalhador.avatar" />
            </q-avatar>
            <div class="profile-info">
              <h2>{{ selectedTrabalhador.nome }}</h2>
              <p class="profile-funcao">{{ selectedTrabalhador.funcao }}</p>
              <div class="profile-badges">
                <q-chip
                  :color="selectedTrabalhador.situacao === 'Ativo' ? 'positive' : 'warning'"
                  text-color="white"
                >
                  {{ selectedTrabalhador.situacao }}
                </q-chip>
                <q-chip
                  :color="selectedTrabalhador.documentosOk ? 'positive' : 'warning'"
                  text-color="white"
                  :icon="selectedTrabalhador.documentosOk ? 'check_circle' : 'warning'"
                >
                  {{ selectedTrabalhador.documentosOk ? 'Documentos OK' : 'Docs Pendentes' }}
                </q-chip>
              </div>
            </div>
          </div>

          <div class="profile-details">
            <div class="row q-col-gutter-lg">
              <div class="col-12 col-md-6">
                <q-card flat class="detail-card">
                  <q-card-section>
                    <h4><q-icon name="person" class="q-mr-sm" />Dados Pessoais</h4>
                    <div class="detail-list">
                      <div class="detail-item">
                        <span class="label">CPF</span>
                        <span class="value">{{ selectedTrabalhador.cpf }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="label">RG</span>
                        <span class="value">{{ selectedTrabalhador.rg }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="label">Data de Nascimento</span>
                        <span class="value">{{ selectedTrabalhador.dataNascimento }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="label">E-mail</span>
                        <span class="value">{{ selectedTrabalhador.email }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="label">Telefone</span>
                        <span class="value">{{ selectedTrabalhador.telefone }}</span>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              <div class="col-12 col-md-6">
                <q-card flat class="detail-card">
                  <q-card-section>
                    <h4><q-icon name="work" class="q-mr-sm" />Dados Profissionais</h4>
                    <div class="detail-list">
                      <div class="detail-item">
                        <span class="label">Matrícula</span>
                        <span class="value">{{ selectedTrabalhador.matricula }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="label">Contrato</span>
                        <span class="value">{{ selectedTrabalhador.contrato }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="label">Posto</span>
                        <span class="value">{{ selectedTrabalhador.posto }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="label">Data de Admissão</span>
                        <span class="value">{{ selectedTrabalhador.dataAdmissao }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="label">Salário</span>
                        <span class="value">{{ formatCurrency(selectedTrabalhador.salario) }}</span>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

// Tab ativa
const activeTab = ref('contratos')
const viewMode = ref('cards')

// Busca e filtros
const searchContratos = ref('')
const searchPostos = ref('')
const searchTrabalhadores = ref('')
const searchFiscais = ref('')
const filterStatus = ref(null)
const filterEmpresa = ref(null)
const filterContrato = ref(null)
const filterTurno = ref(null)
const filterFuncao = ref(null)
const filterSituacao = ref(null)

// Seleção
const selectedTrabalhadores = ref([])

// Dialogs
const contractDialog = ref(false)
const trabalhadorDialog = ref(false)
const editingContract = ref(false)
const selectedTrabalhador = ref(null)

// Stepper
const contractStep = ref(1)

// Form do contrato
const contractForm = ref({
  numero: '',
  empresa: null,
  objeto: '',
  vigenciaInicio: '',
  vigenciaFim: '',
  valorMensal: '',
  valorTotal: '',
  fiscal: null,
  observacoes: '',
  postos: [],
})

// Opções
const statusOptions = [
  { label: 'Ativo', value: 'Ativo' },
  { label: 'Em Renovação', value: 'Em Renovação' },
  { label: 'Encerrado', value: 'Encerrado' },
  { label: 'Suspenso', value: 'Suspenso' },
]

const empresaOptions = [
  { label: 'TechServ Terceirização', value: 'TechServ Terceirização' },
  { label: 'Limpeza Total Ltda', value: 'Limpeza Total Ltda' },
  { label: 'Segurança Máxima', value: 'Segurança Máxima' },
  { label: 'Facilities Pro', value: 'Facilities Pro' },
  { label: 'ServiçosJá', value: 'ServiçosJá' },
]

const turnoOptions = [
  { label: 'Diurno', value: 'Diurno' },
  { label: 'Noturno', value: 'Noturno' },
  { label: '12x36 Dia', value: '12x36 Dia' },
  { label: '12x36 Noite', value: '12x36 Noite' },
]

const funcaoOptions = [
  { label: 'Auxiliar de Limpeza', value: 'Auxiliar de Limpeza' },
  { label: 'Vigilante', value: 'Vigilante' },
  { label: 'Recepcionista', value: 'Recepcionista' },
  { label: 'Porteiro', value: 'Porteiro' },
  { label: 'Copeira', value: 'Copeira' },
  { label: 'Auxiliar Administrativo', value: 'Auxiliar Administrativo' },
]

const situacaoOptions = [
  { label: 'Ativo', value: 'Ativo' },
  { label: 'Férias', value: 'Férias' },
  { label: 'Afastado', value: 'Afastado' },
  { label: 'Desligado', value: 'Desligado' },
]

// Dados mockados - Contratos
const contracts = ref([
  {
    id: 1,
    numero: 'CT-2024/001',
    objeto: 'Prestação de serviços de limpeza e conservação predial',
    empresa: 'Limpeza Total Ltda',
    status: 'Ativo',
    vigencia: { inicio: '01/01/2024', fim: '31/12/2024' },
    valorMensal: 45000,
    postos: 8,
    trabalhadores: 12,
    progressoVigencia: 0.45,
    fiscal: { nome: 'Carlos Silva', avatar: 'https://cdn.quasar.dev/img/avatar1.jpg' },
  },
  {
    id: 2,
    numero: 'CT-2024/002',
    objeto: 'Serviços de vigilância patrimonial 24 horas',
    empresa: 'Segurança Máxima',
    status: 'Ativo',
    vigencia: { inicio: '01/03/2024', fim: '28/02/2025' },
    valorMensal: 78000,
    postos: 6,
    trabalhadores: 18,
    progressoVigencia: 0.3,
    fiscal: { nome: 'Ana Rodrigues', avatar: 'https://cdn.quasar.dev/img/avatar2.jpg' },
  },
  {
    id: 3,
    numero: 'CT-2024/003',
    objeto: 'Serviços de recepção e portaria',
    empresa: 'Facilities Pro',
    status: 'Em Renovação',
    vigencia: { inicio: '01/06/2023', fim: '31/05/2024' },
    valorMensal: 32000,
    postos: 5,
    trabalhadores: 7,
    progressoVigencia: 0.92,
    fiscal: { nome: 'Roberto Santos', avatar: 'https://cdn.quasar.dev/img/avatar3.jpg' },
  },
  {
    id: 4,
    numero: 'CT-2023/015',
    objeto: 'Serviços de copa e cozinha',
    empresa: 'ServiçosJá',
    status: 'Ativo',
    vigencia: { inicio: '01/08/2023', fim: '31/07/2024' },
    valorMensal: 18500,
    postos: 3,
    trabalhadores: 4,
    progressoVigencia: 0.75,
    fiscal: { nome: 'Maria Oliveira', avatar: 'https://cdn.quasar.dev/img/avatar4.jpg' },
  },
  {
    id: 5,
    numero: 'CT-2024/004',
    objeto: 'Serviços de manutenção predial',
    empresa: 'TechServ Terceirização',
    status: 'Ativo',
    vigencia: { inicio: '15/02/2024', fim: '14/02/2025' },
    valorMensal: 25000,
    postos: 4,
    trabalhadores: 6,
    progressoVigencia: 0.35,
    fiscal: { nome: 'Carlos Silva', avatar: 'https://cdn.quasar.dev/img/avatar1.jpg' },
  },
  {
    id: 6,
    numero: 'CT-2023/010',
    objeto: 'Serviços de jardinagem e paisagismo',
    empresa: 'Facilities Pro',
    status: 'Encerrado',
    vigencia: { inicio: '01/01/2023', fim: '31/12/2023' },
    valorMensal: 12000,
    postos: 2,
    trabalhadores: 3,
    progressoVigencia: 1,
    fiscal: { nome: 'Ana Rodrigues', avatar: 'https://cdn.quasar.dev/img/avatar2.jpg' },
  },
])

// Dados mockados - Postos de Trabalho
const postos = ref([
  {
    id: 1,
    nome: 'Recepção Principal',
    local: 'Prédio A - Térreo',
    contrato: 'CT-2024/003',
    funcao: 'Recepcionista',
    turno: 'Diurno',
    cargaHoraria: 44,
    ocupado: true,
    trabalhador: {
      nome: 'Maria Santos',
      cpf: '123.456.789-00',
      avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
    },
  },
  {
    id: 2,
    nome: 'Portaria Sul',
    local: 'Entrada Sul',
    contrato: 'CT-2024/002',
    funcao: 'Vigilante',
    turno: '12x36 Dia',
    cargaHoraria: 36,
    ocupado: true,
    trabalhador: {
      nome: 'João Pereira',
      cpf: '987.654.321-00',
      avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    },
  },
  {
    id: 3,
    nome: 'Portaria Sul',
    local: 'Entrada Sul',
    contrato: 'CT-2024/002',
    funcao: 'Vigilante',
    turno: '12x36 Noite',
    cargaHoraria: 36,
    ocupado: true,
    trabalhador: {
      nome: 'Pedro Costa',
      cpf: '456.789.123-00',
      avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
    },
  },
  {
    id: 4,
    nome: 'Limpeza Bloco A',
    local: 'Prédio A - Todos andares',
    contrato: 'CT-2024/001',
    funcao: 'Auxiliar de Limpeza',
    turno: 'Diurno',
    cargaHoraria: 44,
    ocupado: true,
    trabalhador: {
      nome: 'Ana Lima',
      cpf: '789.123.456-00',
      avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    },
  },
  {
    id: 5,
    nome: 'Copa Executiva',
    local: 'Prédio B - 5º andar',
    contrato: 'CT-2023/015',
    funcao: 'Copeira',
    turno: 'Diurno',
    cargaHoraria: 44,
    ocupado: true,
    trabalhador: {
      nome: 'Fernanda Souza',
      cpf: '321.654.987-00',
      avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
    },
  },
  {
    id: 6,
    nome: 'Vigilância Noturna',
    local: 'Área Externa',
    contrato: 'CT-2024/002',
    funcao: 'Vigilante',
    turno: 'Noturno',
    cargaHoraria: 44,
    ocupado: false,
    trabalhador: null,
  },
  {
    id: 7,
    nome: 'Recepção Bloco B',
    local: 'Prédio B - Térreo',
    contrato: 'CT-2024/003',
    funcao: 'Recepcionista',
    turno: 'Diurno',
    cargaHoraria: 44,
    ocupado: false,
    trabalhador: null,
  },
  {
    id: 8,
    nome: 'Manutenção Geral',
    local: 'Todos os Prédios',
    contrato: 'CT-2024/004',
    funcao: 'Auxiliar de Manutenção',
    turno: 'Diurno',
    cargaHoraria: 44,
    ocupado: true,
    trabalhador: {
      nome: 'Carlos Mendes',
      cpf: '654.321.987-00',
      avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    },
  },
])

// Dados mockados - Trabalhadores
const trabalhadores = ref([
  {
    id: 1,
    nome: 'Maria Santos',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    email: 'maria.santos@email.com',
    telefone: '(11) 99999-1234',
    funcao: 'Recepcionista',
    contrato: 'CT-2024/003',
    posto: 'Recepção Principal',
    situacao: 'Ativo',
    documentosOk: true,
    avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
    matricula: 'MAT-001',
    dataNascimento: '15/03/1985',
    dataAdmissao: '01/06/2023',
    salario: 2200,
  },
  {
    id: 2,
    nome: 'João Pereira',
    cpf: '987.654.321-00',
    rg: '98.765.432-1',
    email: 'joao.pereira@email.com',
    telefone: '(11) 99999-5678',
    funcao: 'Vigilante',
    contrato: 'CT-2024/002',
    posto: 'Portaria Sul',
    situacao: 'Ativo',
    documentosOk: true,
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    matricula: 'MAT-002',
    dataNascimento: '22/07/1990',
    dataAdmissao: '01/03/2024',
    salario: 2800,
  },
  {
    id: 3,
    nome: 'Ana Lima',
    cpf: '789.123.456-00',
    rg: '78.912.345-6',
    email: 'ana.lima@email.com',
    telefone: '(11) 99999-9012',
    funcao: 'Auxiliar de Limpeza',
    contrato: 'CT-2024/001',
    posto: 'Limpeza Bloco A',
    situacao: 'Ativo',
    documentosOk: false,
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    matricula: 'MAT-003',
    dataNascimento: '08/11/1988',
    dataAdmissao: '01/01/2024',
    salario: 1800,
  },
  {
    id: 4,
    nome: 'Pedro Costa',
    cpf: '456.789.123-00',
    rg: '45.678.912-3',
    email: 'pedro.costa@email.com',
    telefone: '(11) 99999-3456',
    funcao: 'Vigilante',
    contrato: 'CT-2024/002',
    posto: 'Portaria Sul',
    situacao: 'Ativo',
    documentosOk: true,
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
    matricula: 'MAT-004',
    dataNascimento: '30/05/1992',
    dataAdmissao: '01/03/2024',
    salario: 2800,
  },
  {
    id: 5,
    nome: 'Fernanda Souza',
    cpf: '321.654.987-00',
    rg: '32.165.498-7',
    email: 'fernanda.souza@email.com',
    telefone: '(11) 99999-7890',
    funcao: 'Copeira',
    contrato: 'CT-2023/015',
    posto: 'Copa Executiva',
    situacao: 'Férias',
    documentosOk: true,
    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
    matricula: 'MAT-005',
    dataNascimento: '12/09/1987',
    dataAdmissao: '01/08/2023',
    salario: 1900,
  },
  {
    id: 6,
    nome: 'Carlos Mendes',
    cpf: '654.321.987-00',
    rg: '65.432.198-7',
    email: 'carlos.mendes@email.com',
    telefone: '(11) 99999-2345',
    funcao: 'Auxiliar de Manutenção',
    contrato: 'CT-2024/004',
    posto: 'Manutenção Geral',
    situacao: 'Ativo',
    documentosOk: true,
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    matricula: 'MAT-006',
    dataNascimento: '25/01/1983',
    dataAdmissao: '15/02/2024',
    salario: 2500,
  },
  {
    id: 7,
    nome: 'Lucia Ferreira',
    cpf: '147.258.369-00',
    rg: '14.725.836-9',
    email: 'lucia.ferreira@email.com',
    telefone: '(11) 99999-6789',
    funcao: 'Auxiliar de Limpeza',
    contrato: 'CT-2024/001',
    posto: 'Limpeza Bloco B',
    situacao: 'Afastado',
    documentosOk: false,
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    matricula: 'MAT-007',
    dataNascimento: '03/04/1991',
    dataAdmissao: '01/01/2024',
    salario: 1800,
  },
  {
    id: 8,
    nome: 'Roberto Alves',
    cpf: '258.369.147-00',
    rg: '25.836.914-7',
    email: 'roberto.alves@email.com',
    telefone: '(11) 99999-0123',
    funcao: 'Porteiro',
    contrato: 'CT-2024/003',
    posto: 'Portaria Norte',
    situacao: 'Ativo',
    documentosOk: true,
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
    matricula: 'MAT-008',
    dataNascimento: '17/12/1986',
    dataAdmissao: '01/06/2023',
    salario: 2100,
  },
])

// Dados mockados - Fiscais
const fiscais = ref([
  {
    id: 1,
    nome: 'Carlos Silva',
    cargo: 'Fiscal de Contratos Sênior',
    email: 'carlos.silva@empresa.gov.br',
    telefone: '(11) 3333-1234',
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    contratosAtivos: 2,
    postosSupervisionados: 12,
    avaliacaoMedia: '4.8',
    contratos: ['CT-2024/001', 'CT-2024/004'],
  },
  {
    id: 2,
    nome: 'Ana Rodrigues',
    cargo: 'Fiscal de Contratos',
    email: 'ana.rodrigues@empresa.gov.br',
    telefone: '(11) 3333-5678',
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    contratosAtivos: 2,
    postosSupervisionados: 8,
    avaliacaoMedia: '4.9',
    contratos: ['CT-2024/002', 'CT-2023/010'],
  },
  {
    id: 3,
    nome: 'Roberto Santos',
    cargo: 'Fiscal de Contratos',
    email: 'roberto.santos@empresa.gov.br',
    telefone: '(11) 3333-9012',
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
    contratosAtivos: 1,
    postosSupervisionados: 5,
    avaliacaoMedia: '4.5',
    contratos: ['CT-2024/003'],
  },
  {
    id: 4,
    nome: 'Maria Oliveira',
    cargo: 'Fiscal de Contratos Júnior',
    email: 'maria.oliveira@empresa.gov.br',
    telefone: '(11) 3333-3456',
    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
    contratosAtivos: 1,
    postosSupervisionados: 3,
    avaliacaoMedia: '4.7',
    contratos: ['CT-2023/015'],
  },
])

// Computed
const totalPostos = computed(() => postos.value.length)
const totalTrabalhadores = computed(
  () => trabalhadores.value.filter((t) => t.situacao === 'Ativo').length,
)

const contratoOptions = computed(() =>
  contracts.value.map((c) => ({ label: c.numero, value: c.numero })),
)

const fiscalOptionsForSelect = computed(() =>
  fiscais.value.map((f) => ({
    label: f.nome,
    value: f.id,
    avatar: f.avatar,
    cargo: f.cargo,
  })),
)

const filteredContratos = computed(() => {
  let result = contracts.value
  if (searchContratos.value) {
    const search = searchContratos.value.toLowerCase()
    result = result.filter(
      (c) =>
        c.numero.toLowerCase().includes(search) ||
        c.objeto.toLowerCase().includes(search) ||
        c.empresa.toLowerCase().includes(search),
    )
  }
  if (filterStatus.value) {
    result = result.filter((c) => c.status === filterStatus.value)
  }
  if (filterEmpresa.value) {
    result = result.filter((c) => c.empresa === filterEmpresa.value)
  }
  return result
})

const filteredPostos = computed(() => {
  let result = postos.value
  if (searchPostos.value) {
    const search = searchPostos.value.toLowerCase()
    result = result.filter(
      (p) => p.nome.toLowerCase().includes(search) || p.local.toLowerCase().includes(search),
    )
  }
  if (filterContrato.value) {
    result = result.filter((p) => p.contrato === filterContrato.value)
  }
  if (filterTurno.value) {
    result = result.filter((p) => p.turno === filterTurno.value)
  }
  return result
})

const filteredTrabalhadores = computed(() => {
  let result = trabalhadores.value
  if (searchTrabalhadores.value) {
    const search = searchTrabalhadores.value.toLowerCase()
    result = result.filter(
      (t) =>
        t.nome.toLowerCase().includes(search) ||
        t.cpf.includes(search) ||
        t.email.toLowerCase().includes(search),
    )
  }
  if (filterFuncao.value) {
    result = result.filter((t) => t.funcao === filterFuncao.value)
  }
  if (filterSituacao.value) {
    result = result.filter((t) => t.situacao === filterSituacao.value)
  }
  return result
})

const filteredFiscais = computed(() => {
  let result = fiscais.value
  if (searchFiscais.value) {
    const search = searchFiscais.value.toLowerCase()
    result = result.filter(
      (f) => f.nome.toLowerCase().includes(search) || f.email.toLowerCase().includes(search),
    )
  }
  return result
})

// Colunas das tabelas
const contratosColumns = [
  { name: 'numero', label: 'Contrato', field: 'numero', align: 'left', sortable: true },
  {
    name: 'objeto',
    label: 'Objeto',
    field: 'objeto',
    align: 'left',
    style: 'max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
  },
  { name: 'status', label: 'Status', field: 'status', align: 'center', sortable: true },
  {
    name: 'valorMensal',
    label: 'Valor Mensal',
    field: 'valorMensal',
    align: 'right',
    sortable: true,
  },
  { name: 'postos', label: 'Postos', field: 'postos', align: 'center', sortable: true },
  { name: 'fiscal', label: 'Fiscal', field: (row) => row.fiscal.nome, align: 'left' },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' },
]

const trabalhadoresColumns = [
  { name: 'nome', label: 'Colaborador', field: 'nome', align: 'left', sortable: true },
  { name: 'cpf', label: 'CPF', field: 'cpf', align: 'left' },
  { name: 'funcao', label: 'Função', field: 'funcao', align: 'left', sortable: true },
  { name: 'contrato', label: 'Contrato', field: 'contrato', align: 'left', sortable: true },
  { name: 'posto', label: 'Posto', field: 'posto', align: 'left' },
  { name: 'situacao', label: 'Situação', field: 'situacao', align: 'center', sortable: true },
  { name: 'documentos', label: 'Documentos', field: 'documentosOk', align: 'center' },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' },
]

// Métodos
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

const getStatusColor = (status) => {
  const colors = {
    Ativo: 'positive',
    'Em Renovação': 'warning',
    Encerrado: 'grey',
    Suspenso: 'negative',
  }
  return colors[status] || 'grey'
}

const openContractDialog = () => {
  editingContract.value = false
  contractStep.value = 1
  contractForm.value = {
    numero: '',
    empresa: null,
    objeto: '',
    vigenciaInicio: '',
    vigenciaFim: '',
    valorMensal: '',
    valorTotal: '',
    fiscal: null,
    observacoes: '',
    postos: [],
  }
  contractDialog.value = true
}

const editContract = (contract) => {
  editingContract.value = true
  contractStep.value = 1
  contractForm.value = { ...contract, postos: [] }
  contractDialog.value = true
}

const viewContract = (contract) => {
  console.log('View contract:', contract)
}

const saveContract = () => {
  console.log('Saving contract:', contractForm.value)
  contractDialog.value = false
}

const addPosto = () => {
  contractForm.value.postos.push({
    nome: '',
    local: '',
    funcao: null,
    turno: null,
  })
}

const removePosto = (index) => {
  contractForm.value.postos.splice(index, 1)
}

const openPostoDialog = () => {
  console.log('Open posto dialog')
}

const openTrabalhadorDialog = () => {
  console.log('Open trabalhador dialog')
}

const openFiscalDialog = () => {
  console.log('Open fiscal dialog')
}

const viewTrabalhador = (trabalhador) => {
  selectedTrabalhador.value = trabalhador
  trabalhadorDialog.value = true
}
</script>

<style lang="scss">
// Variables
$card-radius: 12px;
$transition: all 0.2s ease;

// Page Layout
.contracts-page {
  background: #f8fafc;
  min-height: 100vh;

  .body--dark & {
    background: #0f172a;
  }
}

// Page Header
.page-header {
  background: white;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  .body--dark & {
    background: #1e293b;
    border-bottom-color: rgba(255, 255, 255, 0.05);
  }
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;

  .body--dark & {
    color: #f1f5f9;
  }
}

.page-subtitle {
  color: #64748b;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

// Stats Row
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: #f8fafc;
  border-radius: $card-radius;
  border: 1px solid rgba(0, 0, 0, 0.05);

  .body--dark & {
    background: #0f172a;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.bg-primary-light {
    background: rgba(99, 102, 241, 0.1);
  }
  &.bg-positive-light {
    background: rgba(34, 197, 94, 0.1);
  }
  &.bg-info-light {
    background: rgba(59, 130, 246, 0.1);
  }
  &.bg-warning-light {
    background: rgba(245, 158, 11, 0.1);
  }
}

.stat-info {
  flex: 1;

  .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;

    .body--dark & {
      color: #f1f5f9;
    }
  }

  .stat-label {
    font-size: 0.8rem;
    color: #64748b;
  }
}

// Content Section
.content-section {
  padding: 1.5rem 2rem;
}

.main-card {
  border-radius: $card-radius;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;

  .body--dark & {
    background: #1e293b;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

.main-tabs {
  .q-tab {
    text-transform: none;
    font-weight: 500;
  }
}

.tab-panels {
  min-height: 500px;
}

// Panel Header
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  .body--dark & {
    background: #0f172a;
    border-bottom-color: rgba(255, 255, 255, 0.05);
  }
}

.search-filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.search-input {
  width: 280px;

  .q-field__control {
    border-radius: 8px;
  }
}

.filter-select {
  width: 160px;

  .q-field__control {
    border-radius: 8px;
  }
}

.view-toggle {
  .q-btn-group {
    border-radius: 8px;
    overflow: hidden;
  }
}

// Contracts Grid
.contracts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
}

.contract-card {
  border-radius: $card-radius;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: $transition;
  overflow: hidden;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  .body--dark & {
    background: #0f172a;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

.contract-header {
  padding-bottom: 0.75rem !important;
}

.contract-number {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0.75rem 0 0.25rem;

  .body--dark & {
    color: #f1f5f9;
  }
}

.contract-object {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.contract-details {
  padding: 0.75rem 1rem !important;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #475569;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  .body--dark & {
    color: #94a3b8;
  }
}

.contract-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem !important;
}

.footer-stats {
  display: flex;
  gap: 1rem;
}

.footer-stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: #64748b;
}

.fiscal-avatar {
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.contract-progress {
  padding: 0;
}

// Table Styles
.table-container {
  padding: 1rem;
}

.contracts-table,
.trabalhadores-table {
  .q-table__top,
  .q-table__bottom {
    border: none;
  }

  thead th {
    font-weight: 600;
    color: #64748b;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  tbody td {
    font-size: 0.875rem;
  }
}

// Postos Grid
.postos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
}

.posto-card {
  border-radius: $card-radius;
  border: 1px solid rgba(0, 0, 0, 0.05);

  .body--dark & {
    background: #0f172a;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

.posto-nome {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem;

  .body--dark & {
    color: #f1f5f9;
  }
}

.posto-local {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.posto-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.info-item {
  .info-label {
    display: block;
    font-size: 0.7rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .info-value {
    font-size: 0.875rem;
    font-weight: 500;
    color: #334155;

    .body--dark & {
      color: #e2e8f0;
    }
  }
}

.trabalhador-alocado {
  padding: 0.75rem;
  background: rgba(34, 197, 94, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(34, 197, 94, 0.1);
}

.vago-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  text-align: center;

  span {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .body--dark & {
    background: #1e293b;
  }
}

.posto-actions {
  border-top: 1px solid rgba(0, 0, 0, 0.05);

  .body--dark & {
    border-top-color: rgba(255, 255, 255, 0.05);
  }
}

// Fiscais Grid
.fiscais-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
}

.fiscal-card {
  border-radius: $card-radius;
  border: 1px solid rgba(0, 0, 0, 0.05);

  .body--dark & {
    background: #0f172a;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

.fiscal-nome {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;

  .body--dark & {
    color: #f1f5f9;
  }
}

.fiscal-cargo {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0.25rem 0 0;
}

.fiscal-contacts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.fiscal-stats {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.fiscal-stat {
  .fiscal-stat-value {
    display: block;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--q-primary);
  }

  .fiscal-stat-label {
    font-size: 0.75rem;
    color: #64748b;
  }
}

.fiscal-contratos-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.fiscal-contratos-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.fiscal-actions {
  border-top: 1px solid rgba(0, 0, 0, 0.05);

  .body--dark & {
    border-top-color: rgba(255, 255, 255, 0.05);
  }
}

// Status Badge
.status-badge {
  width: 12px !important;
  height: 12px !important;
  min-height: 12px !important;
  border: 2px solid white;

  .body--dark & {
    border-color: #1e293b;
  }
}

.status-badge-lg {
  width: 20px !important;
  height: 20px !important;
  min-height: 20px !important;
}

// Doc Status
.doc-status {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
}

// Dialog Styles
.dialog-card {
  display: flex;
  flex-direction: column;
}

.dialog-toolbar {
  background: var(--q-primary);
  color: white;
}

.dialog-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 !important;
}

.contract-stepper {
  .q-stepper__step-inner {
    padding: 1.5rem;
  }
}

.step-content {
  padding: 1rem 0;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.form-field {
  .q-field__control {
    border-radius: 8px;
  }

  &.full-width {
    grid-column: span 2;

    @media (max-width: 600px) {
      grid-column: span 1;
    }
  }
}

.empty-postos {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  text-align: center;

  p {
    color: #64748b;
    margin: 0;
  }
}

.postos-form-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.posto-form-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  .body--dark & {
    border-color: rgba(255, 255, 255, 0.1);
  }
}

// Review Card
.review-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  .body--dark & {
    background: #0f172a;
    border-color: rgba(255, 255, 255, 0.1);
  }
}

.review-section {
  h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #64748b;
    margin: 0 0 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  p {
    color: #334155;
    margin: 0;

    .body--dark & {
      color: #e2e8f0;
    }
  }
}

.review-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.review-item {
  .review-label {
    display: block;
    font-size: 0.75rem;
    color: #94a3b8;
  }

  .review-value {
    font-weight: 500;
    color: #1e293b;

    .body--dark & {
      color: #f1f5f9;
    }
  }
}

// Profile Dialog
.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, var(--q-primary), #8b5cf6);
  color: white;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
}

.profile-avatar {
  border: 4px solid rgba(255, 255, 255, 0.3);
}

.profile-info {
  h2 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;
  }

  .profile-funcao {
    opacity: 0.9;
    margin: 0.25rem 0 1rem;
  }
}

.profile-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.profile-details {
  padding: 1.5rem;
}

.detail-card {
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: $card-radius;
  height: 100%;

  h4 {
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 1rem;

    .body--dark & {
      color: #f1f5f9;
    }
  }

  .body--dark & {
    background: #0f172a;
    border-color: rgba(255, 255, 255, 0.05);
  }
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .label {
    color: #64748b;
    font-size: 0.875rem;
  }

  .value {
    font-weight: 500;
    color: #1e293b;

    .body--dark & {
      color: #f1f5f9;
    }
  }

  .body--dark & {
    border-bottom-color: rgba(255, 255, 255, 0.05);
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
