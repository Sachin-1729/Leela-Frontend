import { useCallback, useState } from 'react'
import { Button, Card, Container, Heading, Mono, Modal, Reveal, Section, SectionHead, Text } from '../ui'
import { communities } from '../../data/communities'
import CommunityJoinForm from '../community/CommunityJoinForm'
import CommunityJoinSuccess from '../community/CommunityJoinSuccess'

/** Communities listing — "Join" opens the registration form in a popup. */
export function Communities() {
  const [communityToJoin, setCommunityToJoin] = useState(null)
  const [registration, setRegistration] = useState(null)

  const closeModal = useCallback(() => {
    setCommunityToJoin(null)
    setRegistration(null)
  }, [])

  return (
    <Section id="communities" className="bg-plum">
      <Container>
        <SectionHead kicker="Find your circle" title="Build Your Community.">
          Find your passion, meet like-minded people, and become part of something meaningful at Leela.
        </SectionHead>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {communities.map((community, i) => (
            <Reveal key={community.id} delay={i * 90}>
              <Card
                surface="bare"
                hover="lift"
                glow={community.glow}
                className="h-full min-h-[300px] px-7 py-[34px]"
              >
                <div className="text-[34px]" aria-hidden="true">
                  {community.icon}
                </div>
                <Heading level={3} size="md" className="mb-1.5 mt-4 text-2xl">
                  {community.name}
                </Heading>
                <Mono className="mb-3 text-[12.5px] text-paper/65">{community.category}</Mono>
                <Text size="sm" className="mb-6 grow text-paper/75">
                  {community.description}
                </Text>
                <Button
                  type="button"
                  size="md"
                  className="self-start"
                  onClick={() => setCommunityToJoin(community)}
                >
                  Join
                </Button>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>

      <Modal
        open={Boolean(communityToJoin || registration)}
        onClose={closeModal}
        label={registration ? 'Registration received' : `Join ${communityToJoin?.name ?? ''}`}
      >
        {registration ? (
          <CommunityJoinSuccess registration={registration} onDone={closeModal} doneLabel="Done" />
        ) : (
          communityToJoin && (
            <CommunityJoinForm
              community={communityToJoin}
              onSuccess={(newRegistration) => {
                setRegistration(newRegistration)
                setCommunityToJoin(null)
              }}
            />
          )
        )}
      </Modal>
    </Section>
  )
}
