import { useQuery } from '@tanstack/react-query';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { H1, Image, ScrollView, YStack, Text, Paragraph } from 'tamagui';

import { MediaType } from '~/interfaces/apiresult';
import { getMovieDetails } from '~/services/api';
import { Main } from '~/tamagui.config';

interface DetailsPageProps {
  id: string;
  mediaType: MediaType;
}

const DetailsPage = ({ id }: DetailsPageProps) => {
  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(Number(id), MediaType.Movie),
  });

  return (
    <Main>
      <ScrollView>
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.backdrop_path}` }}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.poster_path}` }}
            w={200}
            h={300}
            m={20}
            borderRadius={6}
          />
        </ImageBackground>
        <YStack
          p={10}
          animation="lazy"
          enterStyle={{
            opacity: 0,
            y: 10,
          }}>
          <H1 color="$blue7">
            {movieQuery.data?.title || movieQuery.data?.name} <Text fontSize={16}>(2023)</Text>
          </H1>
          <Paragraph theme="alt2">{movieQuery.data?.tagline}</Paragraph>
          <Text fontSize={16}>{movieQuery.data?.overview}</Text>
        </YStack>
      </ScrollView>
    </Main>
  );
};

export default DetailsPage;
