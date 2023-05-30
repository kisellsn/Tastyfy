import React from 'react';
import Vector1Image from 'src/assets/images/about_Vector_1.png';
import './styles.scss'
import { useNavigate } from 'react-router-dom';

function Privacy(props) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/menu');
  };
  return (
    <div id='mainP' className={props.className}>
      <div id='SpotifyLogoS'></div>
      <div id='leftRectangle'>
        <div id='tastyfy'>{`Tastyfy`}</div>
        <div id='backRectangle' onClick={handleGoBack}>
            <div id='q1'>
                <img id='vector1' src={Vector1Image} loading="lazy" alt={'Vector'} />
            </div>
            <div id='back'>Back</div>
        </div>
      </div>
      <div id='descriptionP'>
        <div id='privacy'>{`Privacy
        `}</div>
        <div id='textPrivacy'>
          Effective Date: 31.05.2023
          <br/><br/>
          This Privacy Policy describes how Tastyfy ("we," "us," or "our") collects, uses, and shares information when you use our music tastes analyzer application ("App"). By using the App, you consent to the practices described in this Privacy Policy.
          <br/><br/>
          <strong>Information We Collect</strong>
          <br/><br/>
          Personal Information: We do not collect any personally identifiable information (such as your name, email address, or contact information) through the App.
          <br/><br/>
          Usage Information: We may collect certain non-personal information automatically when you use the App. This may include your device's unique identifier, IP address, operating system information, and usage statistics.
          <br/><br/>
          Analyzed Data: The App analyzes your music tastes based on the data you provide, such as your music streaming history or preferences. This data is processed locally on your device and is not transmitted to our servers.
          <br/><br/>
          <strong>Use of Information</strong>
          <br/><br/>
          Personal Information: Since we do not collect personal information, we do not use it for any purpose.
          <br/><br/>
          Usage Information: We may use usage information to improve the functionality and performance of the App, troubleshoot issues, and analyze trends.
          <br/><br/>
          Analyzed Data: The analyzed data is used solely to provide you with personalized music recommendations and insights within the App. It is not shared with any third parties.
          <br/><br/>
          <strong>Data Security</strong>
          <br/><br/>
          We take reasonable measures to protect the security of your information. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          <br/><br/>
          <strong>Third-Party Services</strong>
          <br/><br/>
          The App may include links to third-party websites or services that are not operated by us. These third-party services have their own privacy policies, and we have no control over and assume no responsibility for their content, privacy policies, or practices.
          <br/><br/>
          <strong>Children's Privacy</strong>
          <br/><br/>
          The App is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided personal information, please contact us, and we will promptly delete such information from our records.
          <br/><br/>
          <strong>Changes to This Privacy Policy</strong>
          <br/><br/>
          We reserve the right to update or modify this Privacy Policy at any time. We will notify you of any changes by posting the updated Privacy Policy within the App. Your continued use of the App after any modifications indicate your acceptance of the updated Privacy Policy.
          <br/><br/>
          <strong>Contact Us</strong>
          <br/><br/>
          If you have any questions, concerns, or suggestions regarding this Privacy Policy, please contact us at andrey2004112@gmail.com.
        </div>
      </div>

    </div>
  );
}

export default Privacy;
