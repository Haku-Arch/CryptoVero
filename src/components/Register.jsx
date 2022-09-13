import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register,reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import icon  from '../images/register.jpg'

const Register = () => {
    const [registerState, setRegisterState] = useState({
        fullname: "",
        email: "",
        password: "",
        age: 0
    });

    const { fullname, email, password, age } = registerState

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
      if (isSuccess || user) {
        toast.success(message)
        navigate('/')
      }
      dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            fullname,
            email,
            password,
            age
        }

        setRegisterState({
          fullname: "",
          email: "",
          password: "",
          age: 0,
          transactions: []
        })
        dispatch(register(userData))
    } 
    
    return (
        <>
            <section className="h-screen">
              <div className="px-6 h-full text-gray-800">
                <div
                  className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                >
                  <div
                    className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0 mt-20"
                  >
                    <img
                      src={icon}
                      className="rounded-full border shadow-sm w-full"
                      alt="Sample image"
                    />
                  </div>
                  <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                    <form onSubmit={handleSubmit}>
                      <div
                        className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                      >
                        <p className="text-center font-semibold mx-4 mb-0">Register</p>
                      </div>
                      <div className="mb-6">
                        <input
                          type="text"
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput2"
                          placeholder="Fullname"
                          onChange={(e) => setRegisterState({ ...registerState, fullname: e.target.value })}
                        />
                      </div>

                      <div className="mb-6">
                        <input
                          type="text"
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput2"
                          placeholder="Email address"
                          onChange={(e) => setRegisterState({ ...registerState, email: e.target.value })}
                        />
                      </div>

                      <div className="mb-6">
                        <input
                          type="password"
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput2"
                          placeholder="Password"
                          onChange={(e) => setRegisterState({ ...registerState, password: e.target.value })}
                        />
                      </div>
                      <div className="mb-6">
                        <input
                          type="number"
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput2"
                          placeholder="Age"
                          onChange={(e) => setRegisterState({ ...registerState, age: e.target.value })}
                        />
                      </div>
                      <div className="text-center lg:text-left">
                        <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Register</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
        </>
    )
}

export default Register