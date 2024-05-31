import FullScreenBackground from '../../utils/full-screen-background'

import { StatContainers } from '../../components/statsDisplays'

const HomePage = () => {
  return (
    <>
      <FullScreenBackground imageUrl="messi-1-min.jpg">
        {/* <Card
          isBlurred
          className="max-w-[80%] border-none bg-background/60 dark:bg-default-100/50 lg:max-w-[65%]"
          shadow="sm"
        >
           <CardBody>
            <p className="text-xl font-bold md:text-4xl xl:text-5xl">
              "Tienes que luchar para alcanzar tu sueño. Tienes que sacrificarte y
              trabajar duro por ello."
            </p>
          </CardBody> 
        </Card> */}
      </FullScreenBackground>
      <div className="flex w-full flex-col items-center justify-center">
        <StatContainers />
      </div>
    </>
  )
}

export default HomePage
