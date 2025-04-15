import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';
import { MailboxContext } from '../contexts/MailboxContext';

const Layout: React.FC = () => {
  const { t } = useTranslation();
  const { mailbox, setMailbox, isLoading } = useContext(MailboxContext);
  const location = useLocation();
  
  // 根据当前路径设置不同的SEO信息
  const getSEOProps = () => {
    const path = location.pathname;
    
    // 默认SEO属性
    const defaultProps = {
      title: 'MAIL',
      description: 'MAIL',
      keywords: 'MAIL',
    };
    
    // 如果有邮箱信息，添加到标题中
    if (mailbox) {
      return {
        ...defaultProps,
        title: `MAIL`,
        description: `查看 ${mailbox} 的邮箱收件箱`,
      };
    }
    
    return defaultProps;
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <SEO {...getSEOProps()} />
      <Header 
        mailbox={mailbox} 
        onMailboxChange={setMailbox} 
        isLoading={isLoading}
      />
      <main className="flex-1 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 
