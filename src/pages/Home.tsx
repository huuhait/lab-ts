import Header from "../layouts/Header"
import "../assets/styles/pages/home.less"
import usePublicStore from "../store"
import { useEffect } from "react"
import Progress from "../components/Progress"
import BlockItem from "../components/BlockItem"
import { UserIcon, CalendarIcon, PhoneIcon, AtSymbolIcon, GlobeAltIcon, LocationMarkerIcon } from "@heroicons/react/outline"

function Home() {
  const publicStore = usePublicStore()

  useEffect(() => {
    publicStore.fetchUser()
    publicStore.fetchSkills()
    publicStore.fetchProjects()
    publicStore.fetchSchools()
    publicStore.fetchCertificates()
  }, [])

  return (
    <div className="h-screen w-screen bg-sky-100 py-8 flex justify-center">
      <div className="container wide flex drop-shadow-2xl">
        <Header name={publicStore.user?.name as string} job={publicStore.user?.job as string} avatar={publicStore.user?.avatar as string}/>
        <div className="nav col-3 pt-64 px-6 pb-12 rounded-tl-xl rounded-bl-xl">
          <div className="info border-b-2 pb-4 font-medium">
            <div className="flex items-center pb-4">
              <UserIcon className="w-6 h-6" />
              <span className="pl-4 text-base">{publicStore.user?.gender}</span>
            </div>
            <div className="flex items-center pb-4">
              <CalendarIcon className="w-6 h-6" />
              <span className="pl-4 text-base">{publicStore.user?.birthday}</span>
            </div>
            <div className="flex items-center pb-4">
              <PhoneIcon className="w-6 h-6" />
              <span className="pl-4 text-base">{publicStore.user?.phone}</span>
            </div>
            <div className="flex items-center pb-4">
              <AtSymbolIcon className="w-6 h-6" />
              <span className="pl-4 text-base">{publicStore.user?.email}</span>
            </div>
            <div className="flex items-center pb-4">
              <GlobeAltIcon className="w-6 h-6" />
              <a href={publicStore.user?.facebook ? publicStore.user?.facebook : ''} className="pl-4 text-base">{publicStore.user?.facebook ? publicStore.user?.facebook : ''}</a>
            </div>
            <div className="flex items-center pb-4">
              <LocationMarkerIcon className="w-6 h-6" />
              <span className="pl-4 text-base">{publicStore.user?.address ? publicStore.user?.address : ''}</span>
            </div>
          </div>

          <div className="skills border-b-2 py-4">
            <h4 className="font-bold uppercase text-lg pb-4">CÁC KỸ NĂNG</h4>

            {publicStore.skills?.map((skill) => (
                <Progress title={skill.name} score={skill.score} className="py-2"/>
              ))}
          </div>

          <div className="favorites py-4">
            <h4 className="font-bold uppercase text-lg pb-4">SỞ THÍCH</h4>
            
            <ul className="list-disc pl-4">
              {publicStore.user?.favorites.map((favorite) => (
                <li className="py-1">{favorite.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="content col-0 py-64 px-6 rounded-tr-xl rounded-br-xl">
          <div>
            <h3 className="uppercase text-2xl border-b-2 inline-block border-teal-500 pb-1 mb-4 font-medium text-teal-500">DỰ ÁN</h3>

            <ul className="list-disc pl-4">
              {publicStore.projects?.map((project) => (
                <li className="py-1">
                  <BlockItem title={project.name} start_date={project.start_time} end_date={project.end_time} >
                    {project.descriptions.map((description) => (
                      <p className="pt-1">- {description.name}</p>
                    ))}
                  </BlockItem>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home