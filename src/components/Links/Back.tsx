import Link from 'next/link'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BackLinkProps {
    href: string
}

const BackLink = (props: BackLinkProps) => {
  return (
    <Link
      href={props.href}
      className="mt-3 text-blue-500 hover:underline flex items-center p-5"
    >
      <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
      Back
    </Link>
  );
};
export default BackLink;
