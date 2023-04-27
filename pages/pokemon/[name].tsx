import Container from "@/components/UI/atoms/Container";
import Text from "@/components/UI/atoms/Text";
import Title from "@/components/UI/atoms/Title";
import MyBeatLoader from "@/components/UI/molecules/BeatLoader";
import PokemonDetailsPage from "@/components/pages/PokemonDetails";
import { searchPokemon, useSearchPokemon } from "@/hooks/usePokemon";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

const PokemonDetails: FC = (): JSX.Element => {
  const router = useRouter();
  const pokemonName =
    typeof router.query?.name === "string" ? router.query.name : "";

  const {
    isSuccess: pokemonIsSuccess,
    data: pokemonDetails,
    isInitialLoading,
    isLoading,
    isFetching,
    isRefetching,
    isError: pokemonIsError,
  } = useSearchPokemon(pokemonName);

  if (isInitialLoading || isLoading || isFetching || isRefetching) {
    return (
      <Container page="spinner">
        <MyBeatLoader loading={pokemonIsSuccess} />
      </Container>
    );
  }

  if (pokemonIsError) {
    return (
      <Container page="spinner">
        <Link href={"/"}>
          <Text
            textStyle={"textParagraph"}
            css={{
              color: "$seafoamDark",
              marginTop: "$4",
              marginBottom: "$8",
            }}
          >
            <strong>&lt; Back</strong>
          </Text>
        </Link>
        <Title>We couldn&apos;t find your pokemon </Title>
        <div
          style={{ textAlign: "center", margin: "0 auto" }}
          role="img"
          aria-label="sad"
        >
          😢
        </div>
      </Container>
    );
  }

  if (pokemonIsSuccess) {
    return <PokemonDetailsPage pokemon={pokemonDetails} />;
  }

  return <></>;
};

export default PokemonDetails;

export const getStaticProps: GetStaticProps = async (context) => {
  const name = context.params?.name as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["searchPokemon", name], () =>
    searchPokemon(name)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
