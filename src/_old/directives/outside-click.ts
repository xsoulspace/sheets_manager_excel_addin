//https://tahazsh.com/detect-outside-click-in-vue
// This variable will hold the reference to
// document's click handler
let handleOutsideClick: any
import { DirectiveOptions } from 'vue'

const closable: DirectiveOptions = {
  bind(el, binding, vnode) {
    // Here's the click/touchstart handler
    // (it is registered below)
    try {
      handleOutsideClick = (e: {
        stopPropagation: () => void
        target: Node | null
      }) => {
        // console.log("e",e)
        e.stopPropagation()
        // Get the handler method name and the exclude array
        // from the object used in v-closable
        const { handler, exclude } = binding.value

        // This variable indicates if the clicked element is excluded
        let clickedOnExcludedEl = false
        exclude.forEach((refName: string | number) => {
          // We only run this code if we haven't detected
          // any excluded element yet
          if (!clickedOnExcludedEl) {
            // Get the element using the reference name
            if (vnode.context) {
              const excludedEl = vnode.context.$refs[refName]
              // See if this excluded element
              // is the same element the user just clicked on
              //@ts-ignore
              clickedOnExcludedEl = excludedEl.contains(e.target)
            }
          }
        })

        // We check to see if the clicked element is not
        // the dialog element and not excluded
        if (!el.contains(e.target) && !clickedOnExcludedEl) {
          // If the clicked element is outside the dialog
          // and not the button, then call the outside-click handler
          // from the same component this directive is used in
          if (vnode.context) {
            //@ts-ignore
            vnode.context[handler]()
          }
        }
      }
      // Register click/touchstart event listeners on the whole page
      document.addEventListener('click', handleOutsideClick)
      document.addEventListener('touchstart', handleOutsideClick)
    } catch (error) {
      console.log('Vue.directive.closable.bind', error)
    }
  },

  unbind() {
    // If the element that has v-closable is removed, then
    // unbind click/touchstart listeners from the whole page
    document.removeEventListener('click', handleOutsideClick)
    document.removeEventListener('touchstart', handleOutsideClick)
  },
}
export default closable
