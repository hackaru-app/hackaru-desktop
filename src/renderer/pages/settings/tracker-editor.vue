<i18n src="@/assets/locales/pages/settings/tracker-editor.json" />

<template>
  <section>
    <main-header class="is-small is-light" />
    <form @submit.prevent="addTracker">
      <div class="item">
        <label>{{ $t('project') }}</label>
        <project-select v-model="projectId" class="project-select" />
      </div>
      <div class="item">
        <label>{{ $t('description') }}</label>
        <input
          v-model="description"
          :placeholder="$t('descriptionPlaceholder')"
          class="description"
        />
      </div>
      <div class="item">
        <label>{{ $t('process') }}</label>
        <multiselect
          v-model="process"
          :options="options"
          :placeholder="$t('processPlaceholder')"
          :aira-label="$t('processPlaceholder')"
          label="name"
          track-by="name"
          class="process-select"
        >
          <template slot="noResult">
            <span class="not-found">{{ $t('notFound') }}</span>
          </template>
        </multiselect>
      </div>
      <footer>
        <base-button class="is-rounded is-primary" type="submit">{{
          $t('add')
        }}</base-button>
      </footer>
    </form>
  </section>
</template>

<script>
import Multiselect from 'vue-multiselect';
import MainHeader from '@/components/molecules/main-header';
import BaseButton from '@/components/atoms/base-button';
import ProjectSelect from '@/components/molecules/project-select';

export default {
  components: {
    BaseButton,
    MainHeader,
    Multiselect,
    ProjectSelect
  },
  data() {
    return {
      projectId: null,
      process: '',
      description: ''
    };
  },
  computed: {
    options() {
      return this.$store.getters['processes/all'].map(name => ({ name }));
    }
  },
  methods: {
    async addTracker() {
      this.$store.dispatch('trackers/add', {
        projectId: this.projectId,
        description: this.description,
        process: this.process.name
      });
      this.$store.dispatch('toast/success', this.$t('added'));
      await this.$ga.event('Tracker', 'add');
      this.$electron.remote.getCurrentWindow().close();
    }
  }
};
</script>

<style scoped lang="scss">
/deep/ .multiselect__tags {
  border: 0;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 14px;
}
/deep/ .multiselect__single {
  padding: 0;
  margin: 0;
  vertical-align: bottom;
  border: 0;
  font-size: $font-size;
}
/deep/ .multiselect__placeholder {
  padding: 0;
  margin: 0;
}
/deep/ .multiselect__input {
  font-size: $font-size;
  width: 100% !important;
  padding-left: 0;
  margin: 0;
}
/deep/ .multiselect__input::placeholder {
  color: $grey-ccc;
}
/deep/ .multiselect__element {
  font-size: $font-size;
  font-weight: normal;
}
/deep/ .multiselect__element--selected {
  font-size: $font-size;
  font-weight: normal;
}
/deep/ .multiselect__content-wrapper {
  font-size: $font-size;
  border: 0;
  border: 1px $border solid;
}
/deep/ .multiselect__option--selected {
  background-color: #fff;
  font-weight: normal;
}
/deep/ .multiselect__option--highlight {
  background-color: $grey-fafafa;
  color: $grey-333;
  &:after {
    display: none;
  }
}
/deep/ .multiselect__option--selected:after {
  color: $grey-666;
}
.not-found {
  color: $grey-999;
}
form {
  padding-top: 30px;
}
.item {
  display: flex;
  align-items: center;
  border-bottom: 1px $border solid;
  padding: 0 20px;
  min-height: 60px;
  transition: all 0.3s ease;
  label {
    color: $text;
    margin-right: 20px;
    min-width: 90px;
  }
  input {
    border: 0;
    height: 100%;
    min-height: 36px;
  }
}
footer {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
</style>
