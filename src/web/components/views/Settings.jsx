import { useDispatch, useSelector } from '../../utils/atom'
import { Link } from '../atoms/Link'
import { ToggleSwitch } from '../atoms/ToggleSwitch'
import { H6, SmallerText } from '../atoms/Typography'
import { SupportedHosts } from '../molecules/SupportedHosts'
import styled from 'styled-components'
import { useEffect, useState } from 'preact/hooks'
import { getLinkQuery } from '../../../common/settings'
import { Fragment } from 'preact'
import { NotificationsToggle } from '../molecules/NotificationsToggle'
import { Button, DestructiveButton } from '../atoms/Button'
import { FlexColumn, FlexRow } from '../atoms/Layout'
import { LinkingSection } from '../molecules/LinkingSection'
import { Overlay } from '../molecules/Overlay'
import QrSvg from '@wojtekmaj/react-qr-svg'

const LinkNumber = styled.p`
    margin: 1rem 0;
    text-align: center;
    font-size: 1.2rem;
    color: ${({ linked }) => (linked ? 'var(--font)' : 'var(--font-disabled)')};
    font-weight: 700;
    letter-spacing: 2px;
`
const StyledQr = styled(QrSvg)`
    height: 100px;
`
const StyledFlexColumn = styled(FlexColumn)`
    width: 100px;
    margin-right: 50px;
    margin-left: 10px;
`

export function SettingsView ({ hideOverlay, isExtension }) {
    const dispatch = useDispatch()
    const [showLinkWarning, setShowLinkWarning] = useState(false)
    const [externalKey] = useState(getLinkQuery() || window.getMangaScoutLinkId?.())
    const { settings, link } = useSelector(({ settings, link }) => ({ settings, link }))
    useEffect(() => {
        if (link?.key && externalKey && externalKey !== link.key) {
            setShowLinkWarning(true)
        }
    }, [link?.key, externalKey])

    return (
        <Overlay showTopbar={!isExtension} visible={!hideOverlay} onClose={() => dispatch('overlay', '')} title="Settings">
            {showLinkWarning && (
                <div id="link-link-warning">
                    <span>
                            You are already linked to "<span id="warn-current-link" />
                            ". Do you want to switch to the link-number "<span id="warn-new-link" />
                            "?
                    </span>
                    <Button>Change Link-Number</Button>
                </div>
            )}
            <div>
                <H6>Dark Mode</H6>
                <ToggleSwitch
                    initialChecked={settings?.dark}
                    onChange={(dark) => dispatch('setTheme', dark)}
                    label="Enable Dark Mode"
                />
            </div>
            {!isExtension && <NotificationsToggle />}
            <div class="linking">
                <div>
                    <div class="link-id-block">
                        <H6>Link-Number</H6>
                        <SmallerText>
                                        You can use this number to synchronize with other clients or the extension.
                        </SmallerText>
                        <FlexRow>
                            <FlexColumn>
                                <LinkNumber linked={link?.key}>
                                    {link?.key
                                        ? `${link.key.slice(0, 5)}-${link.key.slice(5, 10)}-${link.key.slice(10)}`
                                        : 'Unlinked'}
                                </LinkNumber>
                                {link?.key && (
                                    <Fragment>
                                        <SmallerText style={{ marginBottom: 0 }}>
                                                Or simply use the following link:
                                        </SmallerText>
                                        <FlexRow>
                                            <Link
                                                newTab
                                                href={`https://manga.fochlac.com?link=${link.key}`}
                                                style={{ margin: '0 auto' }}
                                            >
                                                    https://manga.fochlac.com?link={link.key}
                                            </Link>
                                        </FlexRow>
                                    </Fragment>
                                )}
                            </FlexColumn>
                            {link?.key && (
                                <StyledFlexColumn>
                                    <StyledQr value={`https://manga.fochlac.com?link=${link.key}`} />
                                </StyledFlexColumn>
                            )}
                        </FlexRow>
                    </div>
                    <LinkingSection />
                    {!!link?.key && (
                        <div>
                            <H6>Unlink</H6>
                            <div class="unlink-section">
                                <SmallerText>
                                        If you click "Remove Linking" the connection to the linked account will be
                                        removed. Everything will remain as it is now, but your changes will no longer be
                                        synced to other locations and you will no longer recieve updates from the
                                        account.
                                </SmallerText>
                                <FlexRow justify="center" style={{ padding: 8 }}>
                                    <Button onClick={() => dispatch('unlinkAccount')}>Remove Linking</Button>
                                </FlexRow>
                            </div>
                        </div>
                    )}
                    <div>
                        <H6>Reset</H6>
                        <div class="unlink-section">
                            <SmallerText>
                                    If you click "Reset" the connection to the linked account and all local data will be removed.
                                    If you click "Delete" the linked account will be deleted and all data will be removed. Other
                                    clients might still retain local data and need to be reset as well.
                            </SmallerText>
                            <FlexRow justify="space-evenly" style={{ padding: 8 }}>
                                <DestructiveButton onClick={() => dispatch('reset')}>Reset</DestructiveButton>
                                <DestructiveButton onClick={() => dispatch('resetAndDeleteAccount')}>Delete</DestructiveButton>
                            </FlexRow>
                        </div>
                    </div>
                </div>
            </div>
            <div id="donate">
                <H6>Support</H6>
                <SmallerText>
                        If this extension and website is helpful to you, please consider{' '}
                    <Link href="https://paypal.me/fochlac/5" newTab>
                            donating to help with the server costs
                    </Link>
                        . If you want me to add a not yet supported page, make sure it catches my attention by adding a
                        message with the missing page to your{' '}
                    <Link href="https://paypal.me/fochlac/20" newTab>
                            donation
                    </Link>
                        .
                </SmallerText>
            </div>
            <div style={{ marginTop: 'auto' }}>
                <SupportedHosts />
            </div>
        </Overlay>
    )
}
