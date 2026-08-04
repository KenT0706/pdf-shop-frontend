// src/components/About.jsx
import React from 'react';
import { MapPin, Phone, Mail, Globe, Award, Briefcase } from 'lucide-react';

export function About() {
  const companies = [
    'Proton', 'Perodua', 'Kossan', 'Hartalega', 'Power Root', 'Econsave', 'Jaya Grocer',
    'Mr DIY', 'Citylink', 'GDex', 'KPJ Health Care', 'Columbia Asia Hospital',
    'Bucher Emhart Glass', 'A Star Glasstech', 'MAICSA', 'IFCA', 'NGA Human Resources',
    'Honan', 'Symphony Corporate House', 'Davita', 'Broadcom', 'Naza Corporation',
    'Bank Negara', 'Standard Chartered Bank', 'Petronas', 'Boustead Petroleum',
    'Telekom Malaysia', 'ARH Jurukur Bahan', 'The Raintree Club', 'MAVCOM', 'KLIA',
    'Firefly', 'Parex Group', 'Mayshowa Group', 'Massimo', 'Naito-Asia',
    'Malaysia Steel Works', 'Amsteel', 'Lion Steel', 'MRT Corp', 'Multimedia University',
    'UMPSA', 'Prosper Palm Oil', 'KL Kepong Bhd', 'MMC Gamuda', 'Lion Properties',
    'Mutiara Hotel', 'Hextar', 'Magnum Bhd', 'SAINS Sarawak', 'Borneo Housing Mortgage Finance Bhd',
    'Celcom Timur (Sabah)', 'Sabah Ports', 'Suria Capital Holdings',
  ];

  const consultancyProjects = [
    'HR Audit and Process Improvement',
    'Developing and Revision of HR Policies / SOPs / Employee Handbook',
    'Retrenchment Planning and Execution',
    'HR Department Startup and HR Team Mentoring',
  ];

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500 space-y-12 pb-12">
      {/* Company Header */}
      <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-100 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">HR TRAINING CONSULTANCY</h1>
        <p className="text-sm text-slate-500 mb-6">201303134852 / 002229121-W</p>

        <h2 className="text-2xl font-bold text-slate-900 mb-3">Your HR Solutions Professionals</h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-8">
          Committed to increase the skills and professionalism of your organization's human assets
        </p>

        <div className="flex flex-col items-center gap-4 pt-6 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-700">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>Kuala Lumpur, Malaysia</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <span>Principal Consultant: Serene Yap</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Phone className="w-5 h-5 text-blue-600" />
            <span>6 019-2371813</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Mail className="w-5 h-5 text-blue-600" />
            <a href="mailto:yslserene@gmail.com" className="hover:text-blue-600 transition-colors">
              yslserene@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Globe className="w-5 h-5 text-blue-600" />
            <a
              href="http://hr-training-consultancy.strikingly.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors underline"
            >
              hr-training-consultancy.strikingly.com
            </a>
          </div>
        </div>
      </div>

      {/* Consultant Profile */}
      <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-slate-900">
            HR Consultant and Trainer Profile: Serene Yap
          </h2>
        </div>
        <p className="text-sm text-purple-600 font-semibold mb-6">(HRDC Accredited Trainer)</p>

        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            <span className="font-semibold">Serene's</span> greatest passion is to share her knowledge and insights to maintaining and increasing the professionalism and competencies of an organization's human assets and to the HR community.
          </p>

          <p>
            Her hands-on experience in the corporate world enables her to impart her knowledge that draws on both theory and extensive working experience, enabling you and your employees to relate to the sharing of knowledge and skills more easily and able to apply them in your workplace immediately and effectively.
          </p>

          <p>
            <span className="font-semibold">Serene Yap</span>, a Human Resource Trainer and Consultant has been enthusiastically involved in all aspects of human capital development for more than 20 years. Serene holds an MBA in General Management, a certified NLP Practitioner by ISNS and a HRD Corp accredited Trainer.
          </p>

          <p>
            Her industry exposure includes construction, property development and management, retail, hospitality, manufacturing, oil and gas, and consultancy services.
          </p>

          <p>
            During her professional career and as a trainer and consultant, many employees have attained great personal successes in their careers through her guidance, mentoring and coaching. In a similar manner, Serene endeavours to translate her knowledge, skills and abilities to enhance the competencies and professionalism of the HR community.
          </p>
        </div>

        {/* Companies Served */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4">Companies that have benefited include:</h3>
          <div className="flex flex-wrap gap-2">
            {companies.map((company, idx) => (
              <span
                key={idx}
                className="text-sm bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full"
              >
                {company}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-4 italic">...among others.</p>
        </div>

        {/* Consultancy Projects */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4">
            Serene has successfully conducted the following consultancy projects to enhance the agility and best practices of an organization:
          </h3>
          <ul className="space-y-2">
            {consultancyProjects.map((project, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-700">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>{project}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Training Programs Summary */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4">Training Programs Conducted:</h3>
          <p className="text-slate-700 leading-relaxed">
            Over the years, Serene has developed and conducted many programs, some of which include Employment Law & Industrial Relations Masterclass in HR & Termination Procedures, Payroll Management, Optimizing AI efficiency in HR while managing risk & Employment Law compliance, Applications of Employment Act, Sabah Labour Ordinance and Sarawak Labour Ordinance, Developing HR Policies, SOPs and Employee Handbook, Essential Competencies for Effective HRM, Critical HR Skills for Non-HR Managers, Behavioral-based Interview, Managing Performance, Absenteeism and Misconduct, Handling Discipline, Performance, Investigations and Domestic Inquiry, Termination without Violating the Law, HR & IR Documentations and Procedures, Human Resource and Termination Procedures within the Employment Laws, Employer's Rights in Managing Employees, among other specialized training programs.
          </p>
        </div>
      </div>

      <p className="text-center text-sm text-slate-400">© 2025 HRTC</p>
    </div>
  );
}