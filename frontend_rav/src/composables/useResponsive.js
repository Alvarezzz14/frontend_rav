import { ref, onMounted, onUnmounted } from 'vue'

export function useResponsive() {
  const screenSize = ref('desktop')
  
  const checkScreenSize = () => {
    const width = window.innerWidth
    if (width < 768) screenSize.value = 'mobile'
    else if (width < 1024) screenSize.value = 'tablet'
    else screenSize.value = 'desktop'
  }
  
  onMounted(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize)
  })
  
  return { screenSize }
}