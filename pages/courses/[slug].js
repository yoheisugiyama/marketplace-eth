import { Modal } from "@components/ui/common"
import { CourseHero, Curriculum, Keypoints } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"

export default function Course({ course }) {
  return (
    <>
      {course.title}
      <div className="py-4">
        <CourseHero
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <Keypoints points={course.wsl} />
      <Curriculum locked={true} />
      <Modal />
    </>
  )
}

export function getStaticPaths() {
  const { data } = getAllCourses()
  return {
    paths: data.map((c) => ({
      params: {
        slug: c.slug,
      },
    })),
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  const { data } = getAllCourses()

  // filterメソッドは、map関数と似ていて、配列をいじるときにつかう。filterは特定の要素を配列から抽出するときに使う。
  const course = data.filter((c) => c.slug === params.slug)[0]

  return {
    props: {
      course,
    },
  }
}

Course.Layout = BaseLayout
