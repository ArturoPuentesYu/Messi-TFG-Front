import FullScreenBackground from "../../utils/full-screen-background"

import { Card, CardBody } from "@nextui-org/react"
import { StatContainers } from "../../components/statsDisplays"

const HomePage = () => {
  return (
    <>
      <FullScreenBackground imageUrl="wallpapersden.com_lionel-messi-4k-in-black_2560x1080.webp">
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[80%] lg:max-w-[65%]"
          shadow="sm"
        >
          <CardBody>
            <p className="font-bold text-xl md:text-4xl xl:text-5xl">
              "Tienes que luchar para alcanzar tu sueño. Tienes que sacrificarte y
              trabajar duro por ello."
            </p>
          </CardBody>
        </Card>
      </FullScreenBackground>
      <div className="flex flex-col items-center justify-center w-full">
        <StatContainers />
      </div>
    </>
  )
}

export default HomePage
