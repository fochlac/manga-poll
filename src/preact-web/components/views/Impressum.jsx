import { useDispatch } from '../../utils/atom'
import { getQuery } from '../../utils/query-params'
import { H5, SmallerText } from '../atoms/Typography'
import { Overlay } from '../molecules/Overlay'

export function Impressum ({ hideOverlay}) {
    const dispatch = useDispatch()

    return (
        <Overlay visible={!hideOverlay} onClose={() => dispatch('overlay', null)} title="Legal Disclosure and Privacy Policy" instantVisible={getQuery().has('impressum')}>
            <H5>Information in accordance with Section 5 TMG</H5>
            <b>
                <SmallerText>Florian Riedel</SmallerText>
                <SmallerText>Nonnenstr. 36</SmallerText>
                <SmallerText>04229 Leipzig</SmallerText>
                <SmallerText>Email: info@fochlac.com</SmallerText>
            </b>
            <H5>Accountability for content</H5>
            <p>
                The contents of our pages have been created with the utmost care. However, we cannot guarantee the
                contents' accuracy, completeness or topicality. According to statutory provisions, we are furthermore
                responsible for our own content on these web pages. In this matter, please note that we are not obliged
                to monitor the transmitted or saved information of third parties, or investigate circumstances pointing
                to illegal activity.
            </p>
            <p>
                Our obligations to remove or block the use of information under generally applicable laws remain
                unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG).
            </p>
            <H5>Accountability for links</H5>
            <p>
                Responsibility for the content of external links (to web pages of third parties) lies solely with the
                operators of the linked pages.
            </p>
            <p>
                No violations were evident to us at the time of linking. Should any legal infringement become known to
                us, we will remove the respective link immediately.
            </p>
            <H5>Usage Data</H5>
            <p>Usage Data is collected automatically when using the Service.</p>
            <p>
                Usage Data includes information such as Your Device's Internet Protocol address (e.g. IP address), the
                pages of our Service that You visit, the time and date of Your visit, your synchronization identifier
                and information on your bookmarked manga and read/unread chapters.
            </p>
            <p>
                We may also collect information that Your browser sends whenever You visit our Service or when You
                access the Service by or through a mobile device.
            </p>
            <H5>Tracking Technologies and Cookies</H5>
            <p>
                We use the browser storage to store essential information for the functionality of this page such as the
                last fetched set of urls, your synchronization identifier and information on your bookmarked manga and
                read/unread chapters.
            </p>
            <p>We do not use any form of tracking, and we do not pass your information to any third party.</p>

            <H5>Use of Your Personal Data</H5>
            <p>
                We may use Your information for internal purposes, such as data analysis, identifying usage trends and
                to evaluate and improve our Service and your experience.
            </p>
            <p>We will not share Your information with any third party.</p>
            <H5>Retention of Your Personal Data</H5>
            <p>
                The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in
                this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with
                our legal obligations (for example, if we are required to retain your data to comply with applicable
                laws), resolve disputes, and enforce our legal agreements and policies.
            </p>
            <p>
                The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained
                for a shorter period of time, except when this data is used to strengthen the security or to improve the
                functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
            </p>
            <H5>Transfer of Your Personal Data</H5>
            <p>
                Your information, including Personal Data, is processed at the Company's operating offices and in any
                other places where the parties involved in the processing are located. It means that this information
                may be transferred to — and maintained on — computers located outside of Your state, province, country
                or other governmental jurisdiction where the data protection laws may differ than those from Your
                jurisdiction.
            </p>
            <p>
                Your consent to this Privacy Policy followed by Your submission of such information represents Your
                agreement to that transfer.
            </p>
            <p>
                The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in
                accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an
                organization or a country unless there are adequate controls in place including the security of Your
                data and other personal information.
            </p>
            <H5>Disclosure of Your Personal Data</H5>
            <H5>Law enforcement</H5>
            <p>
                Under certain circumstances, the Company may be required to disclose Your Personal Data if required to
                do so by law or in response to valid requests by public authorities (e.g. a court or a government
                agency).
            </p>
            <H5>Other legal requirements</H5>
            <p>
                The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:
            </p>
            <ul>
                <li>Comply with a legal obligation</li>
                <li>Protect and defend the rights or property of the Company</li>
                <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>Protect the personal safety of Users of the Service or the public</li>
                <li>Protect against legal liability</li>
            </ul>
            <H5>Security of Your Personal Data</H5>
            <p>
                The security of Your Personal Data is important to Us, but remember that no method of transmission over
                the Internet, or method of electronic storage is 100% secure. While We strive to use commercially
                acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
            </p>
            <H5>Children's Privacy</H5>
            <p>
                Our Service does not address anyone under the age of 13. We do not knowingly collect personally
                identifiable information from anyone under the age of 13. If You are a parent or guardian and You are
                aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We
                have collected Personal Data from anyone under the age of 13 without verification of parental consent,
                We take steps to remove that information from Our servers.
            </p>
            <p>
                If We need to rely on consent as a legal basis for processing Your information and Your country requires
                consent from a parent, We may require Your parent's consent before We collect and use that information.
            </p>
            <H5>Copyright</H5>
            <p>
                Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law,
                every form of utilizing, reproducing or processing works subject to copyright protection on our web
                pages requires the prior consent of the respective owner of the rights.
            </p>
            <p>
                Individual reproductions of a work are only allowed for private use. The materials from these pages are
                copyrighted and any unauthorized use may violate copyright laws.
            </p>
        </Overlay>
    )
}
