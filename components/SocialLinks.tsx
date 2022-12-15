import GithubIcon from './../public/icons/github.svg';
import InstagramIcon from './../public/icons/instagram.svg';
import LinkedInIcon from './../public/icons/linkedin.svg';
import TwitterIcon from './../public/icons/twitter.svg';

interface SocialLinksData {
  icon: 'svg';
  href: string;
  label: string;
}

const socialLinksData: SocialLinksData[] = [
  {
    icon: InstagramIcon,
    href: 'https://www.instagram.com/opuchalski.pl/',
    label: 'Moje konto na instagramie',
  },
  {
    icon: LinkedInIcon,
    href: 'https://www.linkedin.com/in/oskarpuchalski/',
    label: 'Mój profil na LinkedIn',
  },
  {
    icon: GithubIcon,
    href: 'https://www.github.com/mlodyoskar',
    label: 'Mój profil na GitHub',
  },
  {
    icon: TwitterIcon,
    href: 'https://twitter.com/puchalskioskar',
    label: 'Mój profil na Twitterze',
  },
];

export const SocialLinks = () => {
  return (
    <div className="flex gap-6">
      {socialLinksData.map(({ href, icon: Icon, label }: SocialLinksData) => (
        <a
          className="text-red-400"
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">{label}</span>
          <Icon className=" fill-current" />
        </a>
      ))}
    </div>
  );
};
