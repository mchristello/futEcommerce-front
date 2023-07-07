import Link from "next/link"
import { BsFillArrowUpCircleFill, BsGithub, BsLinkedin } from 'react-icons/bs';
import { SiVercel } from 'react-icons/si';

const FooterComponent: React.FC = () => {
    return (
        <section className="flex justify-around items-center my-5" >
            <p>Develop by Matias Christello || 2023 </p>
            <div className="flex items-center">
                <Link className="mx-5" href="https://github.com/mchristello" target="_blank"><BsGithub size="30" /></Link>
                <Link className="mx-5" href="https://www.linkedin.com/in/matias-christello/" target="_blank"><BsLinkedin size="30" /></Link>
                <Link className="mx-5" href="https://matiaschristello-portfolio.vercel.app/" target="_blank"><SiVercel size="30" /></Link>
            </div>
            <Link className="fixed bottom-0 right-0 m-5" href="#top">
                <BsFillArrowUpCircleFill size="60" />
            </Link>
        </section>
    )
}

export default FooterComponent;