<script>
  import CompContainer from '@/components/comp-container'
  export default {
    name: 'layout-container',
    props: {
      id: [String, Number]
    },
    render (h) {
      return h(CompContainer, {
        props: {
          containerId: this.id
        }
      })
    }
  }
</script>

