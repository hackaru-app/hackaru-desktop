import i18next from 'i18next'

const namespace = 'reminder'

i18next.addResourceBundle('en', namespace, {
  title: 'Welcome back! What will you do?',
  prevDescription: 'Last time, you were doing "{{prevDescription}}".',
  noPrevDescription: 'Let me know if you want to start a timer.',
  duplicate: 'Duplicate',
})

i18next.addResourceBundle('ja', namespace, {
  title: 'おかえりなさい！何を始めますか？',
  prevDescription: '前回は「{{prevDescription}}」を計測していました。',
  noPrevDescription: '計測を始める際はいつでもお呼びください。',
  duplicate: '同じ内容で開始',
})
