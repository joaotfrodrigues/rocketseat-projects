import logoDark from "../../assets/auth/logoDark.svg";


export function AuthLogo() {
  return (
    <a href="/" className="flex items-center gap-3 mx-auto text-xl leading-[1.4] font-bold text-blue-dark">
      <img src={logoDark} alt="Helpdesk Logo" loading="lazy" className="w-10 h-10" />
      HelpDesk
    </a>
  );
}
