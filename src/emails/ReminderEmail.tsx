import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
} from "@react-email/components"

interface ReminderEmailProps {
    clientEmail: string
    projectName: string
    portalUrl: string
    pendingCount: number
}

export default function ReminderEmail({
    clientEmail = "client@example.com",
    projectName = "Website Redesign",
    portalUrl = "https://onboardify.com/portal/demo",
    pendingCount = 3,
}: ReminderEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>You have pending tasks for {projectName}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            Pending Onboarding Tasks
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Hi there,
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            We're excited to keep moving forward on <strong>{projectName}</strong>.
                            It looks like you have <strong>{pendingCount}</strong> pending item(s) on your onboarding checklist.
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Please take a moment to upload the required assets or complete the forms so our team can proceed with the next phase of the project.
                        </Text>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                className="bg-indigo-600 rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                                href={portalUrl}
                            >
                                Go to Client Portal
                            </Button>
                        </Section>
                        <Text className="text-black text-[14px] leading-[24px]">
                            If you have any questions or need help, feel free to reply directly to this email!
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Best,
                            <br />
                            The Agency Team
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
