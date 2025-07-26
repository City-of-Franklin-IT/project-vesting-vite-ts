import image from '@assets/icons/cof/cof.jpeg'

// Components
import * as Components from './components'

function LoginForm() {

  return (
    <div className="flex flex-col mb-3">
      <img src={image} alt="cof logo" className="w-full hidden lg:block" />
      <div className="flex flex-col p-3">
        <h2 className="text-4xl text-neutral font-[teko] text-center p-4">Franklin Planning Department Login</h2>
        
        <div className="p-4">
          <Components.LoginBtn />
        </div>

        <div className="p-4">
          <Components.ProjectsLink />
        </div>
      </div>
    </div>
  )
}

export default LoginForm