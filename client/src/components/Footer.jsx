const Footer = () => {
  const footerEl = {
    'CUSTOMER SERVICES': [
      'Help & Contact Us',
      'Returns & Refunds',
      'Online Stores',
      'Terms & Conditions',
    ],

    COMPANY: [
      'What We Do',
      'Available Services',
      'Latest Posts',
      'FAQs',
    ],

    'SOCIAL MEDIA': ['Twitter', 'Intagram', 'Facebook', 'Pinterest'],
  };
  // Footer Component
  return (
    <div className="bg-stone-950 text-stone-100">
      <div className="container max-w-4xl mx-auto py-[7%] flex justify-between italic">
        {Object.entries(footerEl).map(([key, values]) => {
          return (
            <ul key={key} className="[&>li]:text-stone-600 [&>li:first-of-type]:mt-6 [&>li]:text-sm [&>li]:mt-2">
              {key}
              {values.map((value, i) => (
                <li key={i}>{value}</li>
              ))}
            </ul>
          );
        })}
      </div>
    </div>
  );
};
export default Footer;
