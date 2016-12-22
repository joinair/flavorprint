
import React from 'react';

import { domain } from 'constants/Config';
import { TERMS_OF_SERVICE, PRIVACY_POLICY } from 'constants/Routes';

import './styles.css';

const humanDomain = domain.replace(/^http[s]?:\/\//i, '');

const staticContent = (
  <div className="Statics">
    <h1>Vivanda FlavorPrint Terms of Service</h1>

    <p>
      These Terms of Service describe the terms and conditions applicable to your use of{' '}
      <a href={domain} title="FlavorPrint" target="_blank" rel="noreferrer noopener">
        {humanDomain}
      </a>{' '}
      and all other websites and applications operated by Vivanda, Inc (“<strong>Vivanda</strong>”
      “<strong>we</strong>,” “<strong>our</strong>,” or “<strong>us</strong>”) that link
      to these Terms of Service (the “<strong>Online Services</strong>”). Your access to
      and use of the Online Services and the information, materials, products, and services
      available through the Online Services is subject to all applicable laws and regulations
      and to these Terms of Service. By accessing any of the Online Services, you acknowledge
      that you have read and understand these Terms of Service, and that you agree to be
      bound by its terms and conditions.
    </p>
    <p>
      We reserve the right to modify these Terms of Service at any time. Such modifications
      shall be effective immediately upon notice to you, which may be given by any means
      including, without limitation, by posting a new Terms of Service at{' '}
      <a href={TERMS_OF_SERVICE} title="Terms of Service" target="_blank" rel="noreferrer noopener">
        {humanDomain}{TERMS_OF_SERVICE}
      </a>.
      Accessing the Online Services after such notice shall be deemed to constitute acceptance
      of such modifications.
    </p>
    <h2>Content/scope of use</h2>
    <p>
      All text, graphics, user interfaces, photographs, trademarks, logos, sounds, music,
      artwork, computer code, and other materials contained on the Online Services (collectively,
      “<strong>Content</strong>”) is owned, controlled, or licensed by or to Vivanda, and
      is protected by trade dress, copyright, patent, and trademark laws, and various other
      intellectual property rights and laws. No license to or right in any such Content is
      granted to or conferred upon you. Except as expressly provided in these Terms of Service,
      you may not use, modify, copy, reproduce, republish, upload, post, transmit, distribute,
      sell, license, rent, publicly display or perform, edit, adapt or create a derivative
      work of, in any manner, any Content or any other part of the Online Services, without
      Vivanda’s express prior written consent.
    </p>
    <p>
      Notwithstanding the above, you may view, use, download, and print selected portions
      of the Online Services solely for your own personal, non-commercial, informational
      use, provided that you do not republish the Content and that you keep intact all copyright,
      trademarks, servicemarks, attributions, patent, and other proprietary notices.
    </p>
    <h2>Intellectual property</h2>
    <p>
      All Vivanda trademarks are the exclusive property of Vivanda. Unauthorized use of any
      Vivanda trademark, service mark, or logo may be a violation of federal and state and
      applicable foreign trademark laws.
    </p>
    <p>
      The Online Services are protected by United States and foreign copyright laws. &nbsp;
      Except for your own personal, non-commercial, informational use as authorized above,
      you may not modify, reproduce, or distribute the design or layout of the Online Services
      or individual sections of the design or layout of the Online Services or logos without
      Vivanda’s written permission.
    </p>
    <h2>Privacy policy</h2>
    <p>
      The Vivanda FlavorPrint Website Privacy Policy (“<strong>Privacy Policy</strong>”)
      is a part of these Terms of Service and is incorporated herein by this reference. By
      accepting these Terms of Service you agree to the collection and use of your information
      by the Online Services as described in the Privacy Policy.
    </p>

    <p>
      Click here{' '}
      <a href={PRIVACY_POLICY} title="Privacy Policy" target="_blank" rel="noreferrer noopener">
        {domain}{PRIVACY_POLICY}
      </a>{' '}
      to view the Privacy Policy.
    </p>

    <h2>Your provision of personal information to us</h2>
    <p>
      When you provide information about yourself to us, you agree to provide accurate, current,
      and complete information about yourself. If you provide any such information that
      is untrue, inaccurate, or incomplete, or we have reasonable grounds to suspect that
      such information is untrue, inaccurate, or incomplete, we have the right to suspend
      or terminate any account you establish in connection with your use of the Online Services
      and refuse any and all current or future use of the Online Services or any portion thereof.
    </p>
    <h2>User-Provided Content</h2>
    <p>
      You understand that all information, data, or other materials that you or another user
      provide in connection with the Online Services or otherwise communicate to us
      (“<strong>User-Provided Content</strong>”), including, but not limited to, pictures
      and recipe reviews, are the sole responsibility of the person from whom such User-Provided
      Content originated. This means that you, and not us, are responsible for all
      User-Provided Content that you upload, post, email, transmit, or otherwise make available
      in connection with the Online Services. We do not control the User-Provided Content
      posted and, as such, do not guarantee the accuracy, integrity, or quality of any User-Provided
      Content. You understand that by using the Online Services, you may be exposed to User-Provided
      Content that is offensive, indecent, or objectionable. Under no circumstances will
      we be liable in any way for any User-Provided Content, including, but not limited to,
      for any errors or omissions in any User-Provided Content, or for any loss or damage
      of any kind incurred as a result of the publication or use of any User-Provided Content
      posted, emailed, transmitted, or otherwise made available in connection with the Online
      Services.
    </p>
    <p>
      By submitting any User-Provided Content to Vivanda, you represent and warrant that:
    </p>
    <ul>
      <li>
        all “moral rights” that you may have in such content have been voluntarily waived by
        you;
      </li>
      <li>
        all content that you post is accurate, does not violate these Terms of Service, and
        will not cause injury to any person or entity; and
      </li>
      <li>
        you are at least 13 years old.
      </li>
    </ul>
    <p>
      All User-Provided Content that you submit may be used at Vivanda’s sole discretion.
      Vivanda reserves the right to change, condense, delete, or refuse to post any User-Provided
      Content on the Online Services in its sole discretion. Vivanda does not guarantee
      that you will have any recourse through Vivanda to edit or delete any User-Provided
      Content you have submitted. None of the User-Provided Content that you submit shall
      be subject to any obligation of confidence on the part of Vivanda, its agents, subsidiaries,
      affiliates, partners, or third-party service providers and their respective directors,
      officers, and employees.
    </p>
    <h2>Your conduct</h2>
    <p>
      You agree to comply with all laws, rules, and regulations applicable to your use of
      the Online Services. In addition, you agree <u>not</u> to:
    </p>
    <ul>
      <li>
        upload, post, email, transmit, or otherwise make available any User-Provided Content
        that is known by you to be false, inaccurate, or misleading;
      </li>
    </ul>
    <ul>
      <li>
        upload, post, email, transmit, or otherwise make available any User-Provided Content
        that violates any law, statute, ordinance, or regulation (including, but not limited
        to, those governing export control, consumer protection, unfair competition, anti-
        discrimination, or false advertising);
      </li>
    </ul>
    <ul>
      <li>
        upload, post, email, transmit, or otherwise make available any User-Provided Content
        that is, or may reasonably be considered to be, harmful, threatening, abusive, harassing,
        tortious, defamatory, vulgar, obscene, libelous, invasive of another’s privacy, hateful,
        or racially, ethnically or otherwise objectionable, or that harms minors in any way;
      </li>
    </ul>
    <ul>
      <li>
        forge headers or otherwise manipulate identifiers in order to disguise the origin of
        any User-Provided Content transmitted in connection with the Online Services;
      </li>
    </ul>
    <ul>
      <li>
        upload, post, email, transmit, or otherwise make available any User-Provided Content
        that you do not have a right to make available under any law or under contractual or
        fiduciary relationships (such as inside information, or proprietary and confidential
        information learned or disclosed as part of employment relationships or under nondisclosure
        agreements);
      </li>
    </ul>
    <ul>
      <li>
        upload, post, email, transmit, or otherwise make available any User-Provided Content
        that infringes any patent, trademark, trade secret, copyright, right of publicity,
        or other proprietary right of any party;
      </li>
    </ul>
    <ul>
      <li>
        upload, post, email, transmit, or otherwise make available any unsolicited or unauthorized
        advertising, promotional materials,{' '}
        {'"junk mail," "spam," "chain letters," "pyramid schemes,"'}
        or any other form of solicitation;
      </li>
    </ul>
    <ul>
      <li>
        upload, post, email, transmit, or otherwise make available any material that contains
        software viruses or any other computer code, files, or programs designed to interrupt,
        destroy, or limit the functionality of any computer software or hardware or
        telecommunications equipment;
      </li>
    </ul>
    <ul>
      <li>
        install any software, file, or code that is not authorized by the user of a computer
        or device or that assumes control of all or any part of the processing performed by
        a computer or device without the authorization of the user of the computer or device;
        or
      </li>
    </ul>
    <ul>
      <li>
        interfere with or disrupt the operation of the Online Services or server networks connected
        to the Online Services, or disobey any requirements, procedures, policies, or regulations
        of networks connected to the Online Services.
      </li>
    </ul>
    <h2>Your grant of limited license</h2>
    <p>
      By uploading, posting, emailing, transmitting, or otherwise making available any
      User-Provided Content, you grant us and our affiliates a perpetual, irrevocable,
      royalty-free, transferable right and license to use, reproduce, display, perform,
      adapt, modify, delete in its entirety, publish, translate, create derivative works
      from, or distribute (or have distributed) such User-Provided Content and/or incorporate
      such User-Provided Content into any form, medium, or technology throughout the world
      without compensation to you, subject to our Privacy Policy. You represent and warrant
      that you own or otherwise control all rights in and to any such User-Provided Content,
      and that our publication and use of your User-Provided Content will not infringe
      or violate the rights of any third party.
    </p>
    <h2>Links</h2>
    <p>
      The Online Services may contain links to websites published by other content providers.
      Also, at your request, the Online Services may connect to social networking websites
      that are not owned or controlled by us. These other websites are not under our control,
      and you acknowledge and agree that we are not responsible for the accuracy, collection,
      and use of your information, copyright compliance, legality, decency, or any other
      aspect of such websites or the content displayed on or through them. The inclusion
      of such a link does not imply our endorsement of any such website or the content
      displayed on or through it or any association with its operators, and we disclaim
      all liability with respect to such linked websites, including but not limited to
      your access to and/or use of the same.
    </p>
    <p>
      Unless otherwise set forth in a written agreement between you and Vivanda, you must
      adhere to Vivanda’s linking policy as follows: (i) any link to the Online Services
      must be a text only link clearly marked {'"Vivanda Website,"'} (ii) the appearance, position,
      and other aspects of the link may not be such as to damage or dilute the goodwill
      associated with Vivanda’s names and trademarks, (iii) the link must “point” to one
      of the Online Services, (iv) the appearance, position, and other attributes of the
      link may not create the false appearance that your organization or entity is sponsored
      by, affiliated with, or associated with Vivanda, (v) when selected by a user, the
      link must display one of the Online Services on full-screen and not within a “frame”
      on the linking website, and (vi) Vivanda reserves the right to revoke its consent
      to the link at any time and in its sole discretion.
    </p>
    <h2>Information, news, and press releases</h2>
    <p>
      The Online Services may contain information, news, and/or press releases about us.
      We disclaim any duty or obligation to update any such information, news, or press
      releases, and your reliance on information contained in these materials is at your
      own risk.
    </p>
    <h2>Registration and passwords</h2>
    <p>
      The Online Services may permit or require you to register or obtain a password prior
      to permitting access to certain products or services available through the Online
      Services. You acknowledge and agree that you are responsible for maintaining the
      confidentiality of your registration information and password, and for all uses of
      your registration information, account, and/or password.
    </p>
    <h2>Disclaimer of warranties</h2>
    <p>
      YOU USE THE ONLINE SERVICES AT YOUR SOLE RISK. THE ONLINE SERVICES ARE PROVIDED ON
      AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED,
      INCLUDING WITHOUT LIMITATION, ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
      FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT OR NON-MISAPPROPRIATION OF INTELLECTUAL
      PROPERTY RIGHTS OF A THIRD PARTY, TITLE, CUSTOM, TRADE, QUIET ENJOYMENT, ACCURACY
      OF INFORMATIONAL CONTENT, OR SYSTEM INTEGRATION. VIVANDA DOES NOT WARRANT THAT THE
      ONLINE SERVICES WILL BE AVAILABLE OR OPERATE IN AN UNINTERRUPTED OR ERROR-FREE MANNER
      OR THAT ERRORS OR DEFECTS WILL BE CORRECTED. IN ADDITION, VIVANDA DOES NOT WARRANT
      THAT INFORMATION AVAILABLE ON OR THROUGH THE ONLINE SERVICES IS APPROPRIATE, ACCURATE,
      OR AVAILABLE FOR USE IN ANY PARTICULAR JURISDICTION, AND ACCESSING IT FROM JURISDICTIONS
      WHERE THE INFORMATION IS ILLEGAL IS EXPRESSLY PROHIBITED. SOME JURISDICTIONS DO NOT
      ALLOW EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.
    </p>
    <h2>Limitation of liability</h2>
    <p>
      VIVANDA IS NOT LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, CONSEQUENTIAL,
      OR EXEMPLARY DAMAGES ARISING OUT OF OR IN ANY WAY RELATED TO THESE TERMS OF SERVICE
      OR THE USE OF, OR INABILITY TO USE, THE ONLINE SERVICES, INCLUDING, WITHOUT LIMITATION,
      DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES (EVEN
      IF VIVANDA HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES). TO THE EXTENT THE
      FOREGOING LIMITATION OF LIABILITY IS, IN WHOLE OR IN PART, HELD TO BE INAPPLICABLE
      OR UNENFORCEABLE FOR ANY REASON, THEN THE AGGREGATE LIABILITY OF VIVANDA FOR ANY
      REASON AND UPON ANY CAUSE OF ACTION (INCLUDING, WITHOUT LIMITATION, NEGLIGENCE, STRICT
      LIABILITY, AND OTHER ACTIONS IN CONTRACT OR TORT) IN ANY WAY RELATED TO THE ONLINE
      SERVICES OR THESE TERMS OF SERVICE SHALL BE LIMITED TO DIRECT DAMAGES ACTUALLY INCURRED
      UP TO TWO HUNDRED FIFTY DOLLARS ($250).
    </p>
    <h2>Business use of online services</h2>
    <p>
      If you are using the Online Services on behalf of a business, that business accepts
      these terms. It will hold harmless and indemnify Vivanda and its affiliates, officers,
      agents, and employees from any claim, suit or action arising from or related to the
      use of the Online Services or violation of these terms, including any liability or
      expense arising from claims, losses, damages, suits, judgments, litigation costs
      and attorneys{"'"} fees.
    </p>
    <h2>Indemnification</h2>
    <p>
      You agree to defend, indemnify, and hold us, our affiliates, subsidiaries, joint
      ventures, third-party service providers, and our respective employees, contractors,
      agents, officers, and directors harmless from all liabilities, claims, and expenses
      (including reasonable attorneys{"'"} fees) that arise out of or are related to any User-Provided
      Content you submit, post, transmit, or make available through the Online Services,
      your violation of these Terms of Service, your misuse of the Online Services, or
      your violation of any third-party rights.
    </p>
    <h2>Choice of law and jurisdiction</h2>
    <p>
      These Terms of Service shall be governed by the laws of the State of Maryland without
      regard to the conflicts of laws rules of any jurisdiction. Every dispute concerning
      the interpretation or effect of these Terms of Service and/or your use of the Online
      Services must be resolved in the state or federal courts situated in the State of
      Maryland. You agree to the personal jurisdiction, subject matter jurisdiction, and
      venue of these courts. Because some jurisdictions do not permit the choice of law
      and jurisdiction, these requirements may not apply to you.
    </p>
    <h2>Equitable relief</h2>
    <p>
      You acknowledge that any breach or threatened breach of these Terms of Service will
      result in irreparable harm for which damages would not be an adequate remedy, and,
      therefore, in addition to our rights and remedies otherwise available at law, we
      shall be entitled to seek immediate equitable relief, including injunctive relief,
      as appropriate. If we seek any equitable remedies, we shall not be precluded or prevented
      from seeking remedies at law, nor shall we be deemed to have made an election of remedies.
    </p>
    <h2>Severability</h2>
    <p>
      If any provision of these Terms of Service is held unenforceable or invalid under
      any applicable law or is so held by applicable court decision, such unenforceability
      or invalidity will not render these Terms of Service unenforceable or invalid as
      a whole, and such provision will be changed and interpreted so as to best accomplish
      the objectives of such unenforceable or invalid provision within the limits of applicable
      law or the applicable court decisions.
    </p>
    <h2>Waiver</h2>
    <p>
      Any waiver by us of a breach of any provision of these Terms of Service shall not
      operate as or be construed to be a waiver of any other breach of such provision or
      of any breach of any other provision of these Terms of Service. Any waiver must be
      in writing. Failure by us to insist upon strict adherence to any term of these Terms
      of Service on one or more occasions shall not be considered a waiver or deprive us
      of the right to insist upon strict adherence to that term or any other term of these
      Terms of Service.
    </p>
    <h2>Termination</h2>
    <p>
      We reserve the right, in our sole discretion, to modify or discontinue, temporarily
      or permanently, any of the Online Services, and/or to terminate or block your access
      to any of the Online Services, with or without notice, at any time and for any reason
      or no reason, including without limitation your violation of these Terms of Service.
      We shall not be liable for any modification, suspension, or discontinuance of any
      Online Services.
    </p>
    <h2>Contact us</h2>
    <p>
      If you have any questions about these Terms of Service, you can contact us at{' '}
      <strong>
        <a href="mailto:contact@vivanda.com" title="contact us">
          contact@vivanda.com
        </a>
      </strong>.
    </p>
    <p>
      <strong>Effective Date:</strong> May 19, 2014.
    </p>
  </div>
);

const TermsOfService = () => staticContent;

export default TermsOfService;
