import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ImageBackground } from 'react-native';
import { Input, ScrollView, Spinner, YStack } from 'tamagui';

import MovieCard from '~/components/MovieCard';
import { useDebounce } from '~/hooks/useDebounce';
import { getSearchResults, getTrending } from '~/services/api';
import { Container, Title, Main, Subtitle } from '~/tamagui.config';

const Page = () => {
  const [searchString, setSearchString] = useState('');
  const debounceString = useDebounce(searchString, 500);

  const trendingQuery = useQuery({
    queryKey: ['trending'],
    queryFn: getTrending,
  });

  const searchQuery = useQuery({
    queryKey: ['search', debounceString],
    queryFn: () => getSearchResults(debounceString),
    enabled: debounceString.length > 0,
  });

  return (
    <Main>
      <ImageBackground
        source={{
          uri: 'https://cdn.tuoitre.vn/zoom/700_390/471584752817336320/2024/8/10/100-2024-1080p-hd-q7ljjnunwqtovkjeiffmtreg7k2-17228436596321407572541-read-only-17232582798341385239489-45-0-1050-1920-crop-17232588361821879867918.jpg',
        }}
        style={{ width: '100%', height: 200 }}>
        <Container>
          <YStack>
            <Title
              color="#fff"
              enterStyle={{
                opacity: 0,
                scale: 1.5,
                y: -10,
              }}
              animation="quick">
              Trending
            </Title>
            <Input
              placeholder="Search for a movie, tv show, person..."
              placeholderTextColor="#fff"
              borderWidth={1}
              value={searchString}
              onChangeText={setSearchString}
            />
          </YStack>
        </Container>
      </ImageBackground>
      <Subtitle
        p={10}
        enterStyle={{
          opacity: 0,
        }}
        animation="lazy">
        {searchQuery.data?.results ? 'Search Results' : 'Trending'}
      </Subtitle>
      {(trendingQuery.isLoading || trendingQuery.isFetching) && (
        <Spinner py={14} size="large" color="$blue10" />
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        py={40}
        contentContainerStyle={{ gap: 14, paddingLeft: 14 }}>
        {searchQuery.data?.results
          ? searchQuery.data?.results.map((item) => <MovieCard key={item.id} movie={item} />)
          : trendingQuery.data?.results.map((item) => <MovieCard key={item.id} movie={item} />)}
      </ScrollView>
    </Main>
  );
};

export default Page;
