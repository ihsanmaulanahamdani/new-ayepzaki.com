import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YoutubeIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

import about from '../data/about.json'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        target="_blank"
        className="group flex items-center text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <div className="h-8 w-8 rounded-full border p-1.5 group-hover:border-teal-500">
          <Icon className="flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        </div>
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - {about.title}</title>
        <meta name="description" content={about.title} />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {about.title}
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              {about.descriptions.map((el, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: el }} />
              ))}
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list" className="flex flex-col gap-y-2">
              {about.socialsMedia.map((socialMedia, i) => (
                <SocialLink
                  key={i}
                  href={socialMedia.url}
                  icon={
                    socialMedia.name === 'x'
                      ? XIcon
                      : socialMedia.name === 'facebook'
                      ? FacebookIcon
                      : socialMedia.name === 'instagram'
                      ? InstagramIcon
                      : socialMedia.name === 'youtube' && YoutubeIcon
                  }
                >
                  {socialMedia.label}
                </SocialLink>
              ))}
              <SocialLink
                href={`mailto:${about.contact.email}`}
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                {about.contact.email}
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
